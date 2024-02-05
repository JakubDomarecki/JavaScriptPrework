require('dotenv').config()
const yaml = require('js-yaml');
const fs = require('fs');

const IS_DEBUG = process.env.DEBUG === "true";

class CriteriaProvider {
    getCriterionById = (criteriaId, filePath) => {
        let exercise;
        let criterion;

        const [,,,pathArray] = filePath.split('/').reverse();
        const exercisesFilePath = `./${pathArray}/.config/exercises.yml`;

        const doc = yaml.load(fs.readFileSync(exercisesFilePath));
        const exercises = Object.keys(doc.exercises).map((key) => ({...doc.exercises[key], exerciseName: key}));

        exercises.forEach(exercise => {
            const criterionFromExercise = exercise.grading.find(criterion =>  String(criterion.id) === criteriaId);

            if(criterionFromExercise) {
                criterion = criterionFromExercise;
            }
        });

        if(IS_DEBUG && !criterion){
            throw new Error(`Criteria for id: ${criteriaId} not found`)
        }

        return criterion;
    }

}

module.exports = new CriteriaProvider();
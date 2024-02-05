require('dotenv').config()
const _pointSplitCharset = require('./SplitCharset').pointsSplitCharset;
const _joinCharset = require('./SplitCharset').idSplitCharset;
const CriteriaProvider = require('./CriteriaProvider');
const {ICONS, ARROW} = _jestUtil().specialChars;
const IS_DEBUG = process.env.DEBUG === "true";

function _jestUtil() {
    const data = require('jest-util');
    _jestUtil = function () {
        return data;
    };
    return data;
}

function _chalk() {
    const data = _interopRequireDefault(require('chalk'));
    _chalk = function () {
        return data;
    };
    return data;
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

class CustomReporter {
    _getMappedResults(results) {
        const {testResults} = results;
        let resultsArray = [];
        testResults.forEach(res => {
            if(res.testExecError) {
                console.log(_chalk().default.red.bold(res.testExecError.message));
            }

            const testCasesWithPath = res.testResults.map(cases => ({...cases, filePath: res.testFilePath }));
            resultsArray = [...resultsArray, ...testCasesWithPath];
        })

        return resultsArray.map(testResult => {
            const {title, fullName, status, ancestorTitles, failureMessages, filePath} = testResult;
            const [titleWithId, points] = title.split(_pointSplitCharset);
            const [titleWithoutId, criteriaId] = titleWithId.split(_joinCharset);
            const [fullNameWithoutId] = fullName.split(_joinCharset);
            const [suitName] = ancestorTitles;

            return ({
                title: titleWithoutId,
                suitName,
                fullName: fullNameWithoutId,
                criteriaId,
                points: Number(points) || null,
                status,
                isPassed: status === "passed",
                failureMessages,
                filePath,
            })
        })
    }

    _getGroupedTestCaseByCriteria(mappedResults) {
        const groupedTests = [];

        mappedResults.forEach(result => {
            const criteriaGroupIndex = groupedTests.findIndex(group => String(group.id) === result.criteriaId);

            if (criteriaGroupIndex === -1) {
                const criterionFromFile = CriteriaProvider.getCriterionById(result.criteriaId, result.filePath);

                groupedTests.push({
                    ...criterionFromFile,
                    name: result.suitName,
                    tests: [result],
                })
            }

            if (criteriaGroupIndex !== -1) {
                groupedTests[criteriaGroupIndex].tests = [...groupedTests[criteriaGroupIndex].tests, result];
            }

        })

        return groupedTests;

    }

    _getStatusIcon(status) {
        if (status === 'failed') {
            return _chalk().default.red(ICONS.failed);
        } else if (status === 'pending') {
            return _chalk().default.yellow(ICONS.pending);
        } else if (status === 'todo') {
            return _chalk().default.magenta(ICONS.todo);
        } else {
            return _chalk().default.green(ICONS.success);
        }
    }

    _getTextColorByStatus(status, text) {
        if (status === 'failed') {
            return _chalk().default.red(text);
        } else if (status === 'pending') {
            return _chalk().default.yellow(text);
        } else if (status === 'todo') {
            return _chalk().default.magenta(text);
        } else {
            return _chalk().default.green(text);
        }
    }

    _getPointsForCriteria(tests) {
        return tests.reduce((acc, {isPassed, points}) => {
            return isPassed ? acc + Number(points) : acc;
        }, 0);

    }

    _logTestsResultsLine(groupedTests) {
        let header = '';
        let yourTotalPoints = 0;
        let totalPoints = 0;

        groupedTests.forEach(group => {
            if(header !== group.name) {
                header = group.name;
                console.log(_chalk().default.cyan.bold(` ${header}`));
            }
            const pointsForCriteria = this._getPointsForCriteria(group.tests);

            const pointsFromTests = group.tests.reduce((acc, { points}) => {
                return acc + Number(points).toFixed(2);
            }, 0);

            yourTotalPoints += pointsForCriteria;
            totalPoints += Number(group.points);

            if(IS_DEBUG && pointsFromTests > group.points) {
                throw new Error('Sum of the points from the tests is greater than in the configuration file');
            }

            console.log(ARROW + "Criterion: " + _chalk().default.italic(group.criterion));
            console.log(`   Your score: ${_chalk().default.bold(pointsForCriteria.toFixed(2) + "/" + group.points.toFixed(2))} points`);

            group.tests.forEach(test => {
                const icon = this._getStatusIcon(test.status);
                const testTitle = this._getTextColorByStatus(test.status, test.title);
                const points = `(${test.isPassed ? test.points.toFixed(2) : '0.00'}/${test.points.toFixed(2)} points)`;
                console.log(`     ${icon} ${points} ${testTitle}`);

                if(test.failureMessages.length > 0) {
                    console.log(_chalk().default.red(test.failureMessages[0]));
                    console.log(`\n`);
                }
            })
            console.log(`\n`);
        })
        console.log('-----------------------------------------');
        console.log(`   Your total score: ${_chalk().default.bold(yourTotalPoints.toFixed(2) + "/" + totalPoints.toFixed(2))} points`);
        console.log('-----------------------------------------');
    }


    async onRunComplete(_, results) {
        const resultsForSend = this._getMappedResults(results);
        const groupedTests = this._getGroupedTestCaseByCriteria(resultsForSend);
        const endpointUrl = process.env.ENDPOINT_URL;

        if (IS_DEBUG && !endpointUrl) {
            throw new Error('Missing ENDPOINT_URL environment variable!');
        }

        if (groupedTests.length > 0) {
            this._logTestsResultsLine(groupedTests);


        } else {
            console.log('------------------------');
            console.log(`| ${_chalk().default.red.bold('Tests suits not found')} |`);
            console.log('------------------------');
        }


        // await fetch(endpointUrl, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(resultsForSend)
        // });
    }
}

module.exports = CustomReporter;
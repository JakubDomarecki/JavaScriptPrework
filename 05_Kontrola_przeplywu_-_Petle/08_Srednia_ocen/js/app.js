const studentsData = [
  { name: 'Mateusz', math: [1, 4, 4, 3.5, 6] },
  { name: 'Beniamin', math: [3, 3, 2, 4, 5] },
  { name: 'Jacek', math: [5, 5, 4, 6, 6] },
];

const result = [];

/**
 * Write your code below!
 */
for (const student of studentsData) {
  const sum = student.math.reduce((acc, grade) => acc + grade, 0);
  const average = sum / student.math.length;
  result.push(`Średnia ocena z matematyki studenta ${student.name}: ${average.toFixed(2)}`);
}
for (const results of result) {
  console.log(results);
}
const numbers = [];
const columns = 4;
const rows = 5;

/**
 * Write your code below!
 */
let count = 1;
for (let i = 0; i < rows; i++) {
	const row = [];
	for (let j = 0; j < columns; j++) {
		row.push(count);
		count++;
	}
	numbers.push(row);
}
console.log(numbers);


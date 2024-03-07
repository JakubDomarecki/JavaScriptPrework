function createArray(rows) {
	let array = [];
	for (let i = 1; i <= rows; i++) {
		array.push(i);
	}
	return array;
}
let array = createArray(5);
console.log(array);
const numbers = [2, 4, 5, 2, 3, 5, 1, 2, 4];

/**
 * Write your code below!
 */
function indexOfRepeatedValue(array) {
	let firstIndex = -1;

	for (let i = 0; i < array.length; i++) {
		for (let j = i + 1; j < array.length; j++) {
			if (array[i] === array[j]) {
				firstIndex = i;
				break;
			}
		}
		if (firstIndex !== -1) {
			break;
		}
	}
	console.log(firstIndex);
	return firstIndex;
}
const resultIndex = indexOfRepeatedValue(numbers);
resultIndex;
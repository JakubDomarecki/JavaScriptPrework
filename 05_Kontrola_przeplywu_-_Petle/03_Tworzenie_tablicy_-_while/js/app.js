const numbers = [];

/**
 * Write your code below!
 */
let i = 0;
let n = 100;
while (i <= n) {
	i++;
	if (i % 3 === 0 && i % 5 === 0) {
		numbers.push(i);
	}
}
console.log(numbers);
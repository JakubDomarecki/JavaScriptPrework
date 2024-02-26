//part 1 - car
const car = {
	type: 'sedan',
	color: 'green',
	engine:  2.5,
};
const carDescription = `${car.type} ${car.color} ${car.engine}`;
console.log(carDescription);


//part 2 - colors
const color = {
	red: 100,
	green: 0,
	blue: 50,
};
const referenceColor = color;
referenceColor.red = 50;
referenceColor.green = 50;

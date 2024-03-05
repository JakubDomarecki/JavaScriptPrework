const people = [
  {
    name: 'Jan',
    surname: 'Kowalski',
    age: 25,
  },
  {
    name: 'Anna',
    surname: 'Nowak',
    age: 30,
  },
  {
    name: 'Bartek',
    surname: 'Malinowski',
    age: 35,
  },
  {
    name: 'Maria',
    surname: 'Zielonka',
    age: 40,
  },
  {
    name: 'Adam',
    surname: 'Kwiatkowski',
    age: 45,
  },
];
const result = [];

/**
 * Write your code below!
 */
for (const person of people) {
  if( person.age > 30 ) {
  result.push(`${person.name} ${person.surname} - wiek ${person.age} lat`);
  }
}
    console.log(result);
/**
 * Part 1: Arrays (var)
 */
var numbers = [1, 2, 3];

console.log(numbers);

var data = [null, undefined, true, 1, 'asd', numbers];

console.log(data);

console.log(data.length);


/**
 * Part 2: Modern JS — spread, destructuring
 */

console.log('\n--- Part 2: Modern JS ---');

const moreNumbers = [...numbers, 4, 5, 6];  // spread operator
console.log('spread:', moreNumbers);

const [first, second, ...rest] = moreNumbers;  // destructuring
console.log('first:', first, 'second:', second, 'rest:', rest);

const combined = [...numbers, ...moreNumbers];  // merge arrays
console.log('combined:', combined);

// Array.from — create array from iterable
const letters = Array.from('hello');
console.log('from string:', letters);

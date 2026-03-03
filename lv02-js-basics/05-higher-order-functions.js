/**
 * Part 1: Higher-order functions (does at least one of the following: takes one or more functions as arguments,
 * returns a function as its result)
 */

function print(input) {
    console.log('Printed input: ' + input);
}

function add(x, y, callback) {
    var result = x + y;
    callback(result);
}

add(3, 4, print);

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var mapped = numbers.map(function (e, i) {
    return Math.pow(e ,2);
});

console.log('mapped', mapped);

function isEven(num) {
    return num % 2 === 0;
}

var filtered = numbers.filter(isEven);

console.log('filtered', filtered);


/**
 * Part 2: Modern JS — arrow functions with map/filter/reduce
 */

console.log('\n--- Part 2: Modern JS ---');

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// arrow functions make callbacks concise
const squared = nums.map(n => n ** 2);
console.log('squared:', squared);

const evens = nums.filter(n => n % 2 === 0);
console.log('evens:', evens);

// reduce — accumulate a single value
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log('sum:', sum);

// chaining
const sumOfEvenSquares = nums
    .filter(n => n % 2 === 0)
    .map(n => n ** 2)
    .reduce((acc, n) => acc + n, 0);
console.log('sum of even squares:', sumOfEvenSquares);

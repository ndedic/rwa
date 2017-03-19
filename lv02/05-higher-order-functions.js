/**
 * Higher-order functions (does at least one of the following: takes one or more functions as arguments,
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
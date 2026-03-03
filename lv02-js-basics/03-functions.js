/**
 * Part 1: Functions (first class citizen)
 */

// declaration
function sayHello() {
    console.log('Hello');
}

// expression
var sayGoodbye = function () {
    console.log('Goodbye')
};

// return value
function add(x, y) {
    return x + y;
}

sayHello();
sayGoodbye();
console.log( add(2, 4) );


/**
 * Part 2: Modern JS — arrow functions, default parameters
 */

console.log('\n--- Part 2: Modern JS ---');

// arrow function — short syntax
const multiply = (x, y) => x * y;
console.log('multiply:', multiply(3, 4));

// arrow with body
const greet = (name) => {
    const msg = `Hello, ${name}!`;
    console.log(msg);
};
greet('Alice');

// default parameters
const power = (base, exp = 2) => Math.pow(base, exp);
console.log('power(3):', power(3));       // 9
console.log('power(3, 3):', power(3, 3)); // 27

/**
 * Part 1: Nested functions (var)
 */

function outer() {

    function inner() {
        return 10;
    };

    return inner() + 20;
}

console.log( outer() );


/**
 * Part 2: Modern JS — nested arrow functions
 */

console.log('\n--- Part 2: Modern JS ---');

const outerModern = () => {
    const inner = () => 10;
    return inner() + 20;
};

console.log(outerModern());

// practical example: function that returns a function
const makeGreeter = (greeting) => (name) => `${greeting}, ${name}!`;

const hello = makeGreeter('Hello');
const hi = makeGreeter('Hi');

console.log(hello('Alice'));
console.log(hi('Bob'));

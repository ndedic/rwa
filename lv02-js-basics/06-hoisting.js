/**
 * Part 1: Hoisting — JavaScript only hoists declarations, not initializations.
 */

console.log(asd);

var asd  = 10;

console.log(asd);


// the same as:

var foo;

console.log(foo);

foo = 11;

console.log(foo);

// functions

try {
    fn1();
    fn2();
} catch (e) {
    console.log(e);
}

var fn1 = function() {
    console.log('fn1 invoked');
};

function fn2() {
    console.log('fn2 invoked');
}


try {
    fn1();
    fn2();
} catch (e) {
    console.log(e);
}


/**
 * Part 2: Modern JS — let/const are NOT hoisted the same way
 *
 * var → hoisted to top of function, initialized as undefined
 * let/const → hoisted to top of block, but NOT initialized (Temporal Dead Zone)
 */

console.log('\n--- Part 2: Modern JS ---');

// This would throw ReferenceError (uncomment to test):
// console.log(x);  // ReferenceError: Cannot access 'x' before initialization
// let x = 10;

// var is hoisted and initialized as undefined:
console.log('var y:', y);  // undefined
var y = 20;

// Takeaway: use let/const and always declare before use.
// Hoisting quirks become irrelevant when you follow this rule.
console.log('Declare before use — hoisting becomes a non-issue.');

/**
 * Part 1: Scope (var — function-scoped)
 */

// global scope

var name = 'John';
var temperature = 25;

var fn = function () {
    console.log('fn', name);
}

fn();

var fn1 = function() {
    // hoisting
    console.log('fn1', name);
    // localscope
    var name = 'Alice';
    console.log('fn1', name);
    // inner function
    var fn2 = function () {
        console.log(name);
        console.log(temperature);
    }
    //return inner
    return fn2;
}

var result = fn1();

result();

var fn3 = function () {

    var temperature = 10;
    // global name
    console.log('fn3', name);
    // local temperature
    console.log('fn3', temperature);
}

fn3();

var a = 10;

if (true) {
    var b = 11;
}

(function() {

    var c = 12;
    d = 13;

    try {
        console.log(a, b, c, d);
    } catch(e) {
        console.log(e);
    }

})();

try {
    console.log(a, b, c, d);
} catch(e) {
    console.log(e);
}


/**
 * Part 2: Modern JS — let/const are block-scoped
 */

console.log('\n--- Part 2: Modern JS ---');

// var leaks out of blocks:
if (true) {
    var leaked = 'I leaked!';
}
console.log('var in if:', leaked);  // works

// let stays in the block:
if (true) {
    let contained = 'I stay here';
    console.log('let in if:', contained);  // works
}
// console.log(contained);  // ReferenceError

// practical difference — loop variable
for (var i = 0; i < 3; i++) {}
console.log('var i after loop:', i);  // 3

for (let j = 0; j < 3; j++) {}
// console.log(j);  // ReferenceError — j is block-scoped
console.log('let j after loop: not accessible (block-scoped)');

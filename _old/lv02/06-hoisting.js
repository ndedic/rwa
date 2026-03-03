/**
 * Hoisting - JavaScript only hoists declarations, not initializations. 
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
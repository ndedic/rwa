/**
 * Functions (first class citizen)
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
/**
 * Scope
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
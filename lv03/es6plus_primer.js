//ES6+ primer

// let and const - block-scoped declarations, const for immutable bindings
let count = 0;
const API_KEY = 'abc123';
{
    let count = 1; // different variable than outer count
    console.log(count); // 1
}
console.log(count); // 0

// Arrow functions - shorter syntax and lexical this binding
const add = (a, b) => a + b;
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);

// Arrow functions and lexical 'this' binding example
const programmer = {
    name: 'John',
    languages: ['JavaScript', 'Python', 'Java'],
    
    displayLanguages() {
        console.log(`${this.name} knows:`);
        
        // Arrow function preserves 'this' from outer scope
        this.languages.forEach(lang => {
            console.log(`${this.name} codes in ${lang}`);
        });

        // Compare with regular function (would lose 'this' context)
        /* this.languages.forEach(function(lang) {
            console.log(`${this.name} codes in ${lang}`); // this.name would be undefined
        }); */
    }
};

programmer.displayLanguages();

// Classes and inheritance - cleaner OOP syntax
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        return `${this.name} makes a sound`;
    }
}
class Dog extends Animal {
    speak() {
        return `${this.name} barks`;
    }
}

// Template literals - string interpolation and multiline strings
const name = 'John';
const greeting = `Hello ${name}!
This is a multiline string`;

// Destructuring - extract values from objects and arrays
const person = { firstName: 'John', lastName: 'Doe' };
const { firstName, lastName } = person;
const [first, second] = [1, 2, 3];

// Default parameters - values used when arguments are undefined
function greet(name = 'Guest') {
    return `Hello ${name}!`;
}

// Rest parameters - collect remaining arguments into array
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

// Spread operator - expand elements
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
const obj1 = { foo: 'bar' };
const obj2 = { ...obj1, baz: 'qux' };

// Promises - handle asynchronous operations
const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data'), 1000);
});

// Modules - organize code into separate files
// file1.js
//export const helper = () => {};
// file2.js
//import { helper } from './file1.js';

// Map and Set - new collection types
const map = new Map();
map.set('key', 'value');
const set = new Set([1, 2, 2, 3]); // unique values only

// Symbol - unique identifiers
const sym = Symbol('description');
const obj = {
    [sym]: 'value'
};

// Iterator and Generator functions
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

// Enhanced object literals - shorter syntax for methods and computed properties
const prop = 'foo';
const object = {
    prop,  // same as prop: prop
    method() {}, // same as method: function() {}
    [prop + 'bar']: 'value' // computed property name
};

// Array.includes() - check if array contains value
const arr = [1, 2, 3];
console.log(arr.includes(2)); // true

// Exponentiation operator
const result = 2 ** 3; // same as Math.pow(2, 3)

// Async/await - cleaner async code
async function getData() {
    const response = await fetch('api/data');
    const data = await response.json();
    return data;
}

// Object.values() and Object.entries()
const obj3 = { a: 1, b: 2 };
console.log(Object.values(obj3)); // [1, 2]
console.log(Object.entries(obj3)); // [['a', 1], ['b', 2]]

// String padding
console.log('5'.padStart(3, '0')); // "005"
console.log('test'.padEnd(8, '!')); // "test!!!!"

// Object rest/spread
const { a, ...rest } = { a: 1, b: 2, c: 3 };
console.log(rest); // { b: 2, c: 3 }

// Optional chaining
const user = { address: { street: 'Main' } };
console.log(user?.address?.street); // 'Main'
console.log(user?.contact?.email); // undefined

// Nullish coalescing
const value = null ?? 'default'; // 'default'
const zero = 0 ?? 42; // 0

// Private class fields
class Counter {
    #count = 0;  // private field
    increment() {
        this.#count++;
    }
}

// Array.at() - get element at index with support for negative indices
const arr3 = [1, 2, 3, 4, 5];
console.log(arr3.at(-1)); // 5 (last element)

// Top-level await (in modules)
// const data = await fetch('api/data'); // works outside async function

// Object.hasOwn()
const obj4 = { prop: undefined };
console.log(Object.hasOwn(obj4, 'prop')); // true

// Array flat and flatMap
const nested = [1, [2, 3], [4, [5]]];
console.log(nested.flat(2)); // [1, 2, 3, 4, 5]
const numbers2 = [1, 2, 3];
console.log(numbers2.flatMap(x => [x, x * 2])); // [1, 2, 2, 4, 3, 6]

// BigInt - large integers
const bigNumber = 9007199254740991n;
const result2 = bigNumber + 1n;

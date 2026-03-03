/**
 * ES6+ Primer — features relevant to RWA04
 *
 * Covers: let/const, arrow functions, classes, template literals,
 * destructuring, default/rest parameters, spread, enhanced object literals.
 */

// --- let/const (block-scoped) ---
let count = 0;
const API_URL = '/api';
{
    let count = 1;       // different variable
    console.log(count);  // 1
}
console.log(count);      // 0


// --- Arrow functions + lexical this ---
const add = (a, b) => a + b;
const doubled = [1, 2, 3].map(n => n * 2);

const programmer = {
    name: 'John',
    languages: ['JavaScript', 'Python', 'Java'],
    displayLanguages() {
        // Arrow function preserves 'this' from outer scope
        this.languages.forEach(lang => {
            console.log(`${this.name} codes in ${lang}`);
        });
    }
};
programmer.displayLanguages();


// --- Classes and inheritance ---
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

const dog = new Dog('Rex');
console.log(dog.speak());


// --- Template literals ---
const name = 'Alice';
const greeting = `Hello ${name}!
This is a multiline string.`;
console.log(greeting);


// --- Destructuring ---
const person = { firstName: 'John', lastName: 'Doe', age: 30 };
const { firstName, lastName } = person;
console.log(firstName, lastName);

const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first, second, rest);


// --- Default and rest parameters ---
function greet(name = 'Guest') {
    return `Hello ${name}!`;
}
console.log(greet());
console.log(greet('Bob'));

function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
console.log('sum:', sum(1, 2, 3, 4));


// --- Spread operator ---
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log('spread array:', arr2);

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 };
console.log('spread object:', obj2);


// --- Enhanced object literals ---
const prop = 'foo';
const obj = {
    prop,                    // shorthand: same as prop: prop
    method() {},             // shorthand method
    [prop + 'bar']: 'value'  // computed property name
};
console.log(obj);

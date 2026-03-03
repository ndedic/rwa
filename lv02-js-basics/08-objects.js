/**
 * Part 1: Objects (literals)
 */

// Object literal

var Person = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@fet.ba',
    getFullName : function () {
        return this.firstName + ' ' + this.lastName;
    },
    'date of birth': new Date('02/03/1984')
};

// dot notation
console.log(Person.firstName);
// 'static' method call
console.log(Person.getFullName());
//undefined
console.log(Person.relatives);
// string with spaces
console.log(Person['date of birth']);


/**
 * Part 2: Modern JS — shorthand properties, methods, computed keys, destructuring
 */

console.log('\n--- Part 2: Modern JS ---');

const firstName = 'Alice';
const lastName = 'Johnson';

// shorthand property names (variable name = key name)
// shorthand methods (no "function" keyword)
const person = {
    firstName,
    lastName,
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
};

console.log(person.getFullName());

// destructuring — extract properties into variables
const { firstName: fn2, lastName: ln } = person;
console.log('destructured:', fn2, ln);

// computed property names
const key = 'email';
const config = { [key]: 'alice@fet.ba' };
console.log('computed key:', config.email);

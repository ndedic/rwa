/**
 * Part 1: Primitives and Objects (var)
 */

// Boolean
var isValid = true;

//Null
var date = null;

//Undefined
var email;

//Number
var height = 181;

//String
var name = 'John';

/**
 * Objects
 */

// object literal
var user = { };

// array
var users = [ ];

// function
var fn = function() { };

console.log('name', typeof name, name);
console.log('height', typeof height, height);
console.log('isValid', typeof isValid, isValid);
console.log('date', typeof date, date);
console.log('email', typeof email, email);
console.log('users', typeof users, users);
console.log('user', typeof user, user);
console.log('fn', typeof fn, fn);


/**
 * Part 2: Modern JS — let/const and template literals
 */

console.log('\n--- Part 2: Modern JS ---');

const PI = 3.14159;          // const — cannot be reassigned
let score = 100;             // let — block-scoped, can be reassigned
score = 200;

// template literals — backticks with ${expression}
const greeting = `Hello, ${name}! Your height is ${height}cm.`;
console.log(greeting);

// typeof behaves the same with let/const
console.log(`PI is a ${typeof PI}`);
console.log(`score is a ${typeof score}`);

/**
 * let vs const vs var
 *
 * var   — function-scoped, hoisted, can be redeclared
 * let   — block-scoped, not hoisted (TDZ), can be reassigned
 * const — block-scoped, not hoisted (TDZ), cannot be reassigned
 */

// --- var: function-scoped, can redeclare ---
var x = 1;
var x = 2;  // no error
console.log('var x:', x);

// --- let: block-scoped, no redeclare ---
let y = 1;
// let y = 2;  // SyntaxError: Identifier 'y' has already been declared
y = 2;         // reassignment is fine
console.log('let y:', y);

// --- const: must initialize, cannot reassign ---
const z = 1;
// z = 2;  // TypeError: Assignment to constant variable
console.log('const z:', z);

// const with objects — the reference is constant, not the contents
const user = { name: 'Alice' };
user.name = 'Bob';  // this works — mutating the object, not reassigning
console.log('const object mutated:', user);

// user = {};  // TypeError — cannot reassign the reference

// --- Block scoping demo ---
{
    let a = 10;
    const b = 20;
    var c = 30;
}
// console.log(a);  // ReferenceError
// console.log(b);  // ReferenceError
console.log('var escapes block:', c);  // 30

// --- Temporal Dead Zone (TDZ) ---
// Variables declared with let/const exist in the block from the start,
// but cannot be accessed until the declaration is reached.

// console.log(tdzVar);  // ReferenceError: Cannot access 'tdzVar' before initialization
// let tdzVar = 'hello';

// --- Rule of thumb ---
// Use const by default. Use let when you need to reassign. Avoid var.
console.log('\nRule: const by default, let when needed, avoid var.');

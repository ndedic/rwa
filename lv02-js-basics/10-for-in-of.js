/**
 * for...in vs for...of
 *
 * for...in — iterates over enumerable property KEYS (designed for objects)
 * for...of — iterates over iterable VALUES (designed for arrays, strings, etc.)
 */

// --- for...in with objects ---
const person = { name: 'Alice', age: 25, city: 'Tuzla' };

console.log('for...in (object keys):');
for (const key in person) {
    console.log(`  ${key}: ${person[key]}`);
}

// --- for...in with arrays (avoid this!) ---
const colors = ['red', 'green', 'blue'];

console.log('\nfor...in (array — gives indices, not values):');
for (const index in colors) {
    console.log(`  ${index}: ${colors[index]}`);  // index is a string!
}

// --- for...of with arrays (correct way) ---
console.log('\nfor...of (array — gives values):');
for (const color of colors) {
    console.log(`  ${color}`);
}

// --- for...of with strings ---
console.log('\nfor...of (string — gives characters):');
for (const char of 'Hello') {
    console.log(`  ${char}`);
}

// --- for...of with entries (index + value) ---
console.log('\nfor...of with entries (index + value):');
for (const [i, color] of colors.entries()) {
    console.log(`  ${i}: ${color}`);
}

// --- Summary ---
// for...in → object keys
// for...of → array/string values
// Don't use for...in on arrays — use for...of or .forEach()
console.log('\nRule: for...in for objects, for...of for arrays.');

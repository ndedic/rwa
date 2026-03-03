/**
 * Asynchronous Programming Basics
 *
 * JavaScript is single-threaded but uses an event loop for async operations.
 * Call Stack → Web APIs → Callback Queue → Event Loop → back to Call Stack.
 */

// --- Synchronous: runs in order ---
console.log('1. First');
console.log('2. Second');
console.log('3. Third');

// --- Asynchronous: setTimeout defers execution ---
console.log('\n--- Event loop demo ---');
console.log('A. Start');

setTimeout(() => {
    console.log('C. Runs after 1 second');
}, 1000);

console.log('B. Runs before timeout (even though it comes after in code)');
// Output order: A, B, C


// --- The classic loop problem (var vs let) ---
console.log('\n--- Loop problem with var ---');
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log('var i:', i);  // Always prints 3 (the final value)
    }, 1500);
}

console.log('\n--- Fixed with let ---');
for (let j = 0; j < 3; j++) {
    setTimeout(() => {
        console.log('let j:', j);  // Prints 0, 1, 2 (block-scoped)
    }, 2000);
}

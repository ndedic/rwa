/**
 * ASYNCHRONOUS PROGRAMMING BASICS
 * 
 * This file explains the fundamentals of asynchronous programming,
 * how it works in JavaScript, and common issues with solutions.
 */

// ========== WHAT IS ASYNCHRONOUS PROGRAMMING? ==========
/**
 * Asynchronous programming is a programming paradigm that allows operations to run
 * in the background while the rest of the code continues to execute.
 * 
 * In synchronous programming, operations block execution until they complete.
 * In asynchronous programming, operations are scheduled to run later, allowing
 * the program to continue executing other code in the meantime.
 */

// Example of synchronous code
console.log("1. This runs first");
console.log("2. This runs second");
console.log("3. This runs third");

// ========== JAVASCRIPT'S ASYNCHRONOUS NATURE ==========
/**
 * JavaScript is single-threaded but uses an event loop to handle asynchronous operations.
 * 
 * Key components:
 * 1. Call Stack: Where synchronous code executes
 * 2. Web APIs: Where asynchronous operations (setTimeout, fetch, etc.) are processed
 * 3. Callback Queue: Where callbacks wait to be executed
 * 4. Event Loop: Moves callbacks from the queue to the call stack when it's empty
 */

console.log("A. Starting...");

setTimeout(() => {
  console.log("C. This runs after 2 seconds");
}, 2000);

console.log("B. This runs before the timeout callback");

// Output order: A, B, C (even though C is only 2 seconds later)

// ========== THE CLASSIC LOOP PROBLEM ==========
/**
 * A common issue in asynchronous JavaScript is the loop variable problem.
 * When using setTimeout in a loop, all callbacks share the same reference
 * to the loop variable, which will have its final value when callbacks execute.
 */

// Problem: All timeouts will print the last index (5)
console.log("Loop problem demonstration:");
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log("Problem - Index value:", i); // Always prints 5
  }, 1000);
}

// Solution 1: Use let instead of var (block scope)
console.log("Solution 1 - Using let:");
for (let j = 0; j < 5; j++) {
  setTimeout(() => {
    console.log("Solution 1 - Index value:", j); // Prints 0, 1, 2, 3, 4
  }, 1500);
}

// Solution 2: Use an IIFE (Immediately Invoked Function Expression)
console.log("Solution 2 - Using IIFE:");
for (var k = 0; k < 5; k++) {
  (function(index) {
    setTimeout(() => {
      console.log("Solution 2 - Index value:", index); // Prints 0, 1, 2, 3, 4
    }, 2000);
  })(k);
}

// ========== KEY TAKEAWAYS ==========
/**
 * 1. JavaScript is single-threaded but can handle asynchronous operations
 * 2. The event loop enables non-blocking behavior
 * 3. Asynchronous code execution order is not always intuitive
 * 4. Be careful with variables in loops when using asynchronous callbacks
 * 5. Use block-scoped variables (let/const) or closures to capture values correctly
 */
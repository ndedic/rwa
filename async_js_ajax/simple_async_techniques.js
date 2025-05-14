/**
 * Simple Async JavaScript Techniques
 * Demonstrating callbacks, promises, and async/await
 */

console.log('===== SIMPLE ASYNC JAVASCRIPT TECHNIQUES =====');

// Simulating an asynchronous operation (e.g., API call, file read)
function simulateAsyncOperation(data, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        resolve(`Success: ${data}`);
      } else {
        reject('Error: No data provided');
      }
    }, delay);
  });
}

// ===== 1. CALLBACKS =====
console.log('\n1. CALLBACKS');

function withCallback(data, delay, successCallback, errorCallback) {
  setTimeout(() => {
    if (data) {
      successCallback(`Success: ${data}`);
    } else {
      errorCallback('Error: No data provided');
    }
  }, delay);
}

// Using callbacks
withCallback(
  'Callback data',
  1000,
  result => console.log(`Callback result: ${result}`),
  error => console.error(`Callback error: ${error}`)
);

// ===== 2. PROMISES =====
console.log('\n2. PROMISES');

// Creating a promise
const myPromise = simulateAsyncOperation('Promise data', 1500);

// Using promises with then/catch
myPromise
  .then(result => {
    console.log(`Promise result: ${result}`);
    // Chain another promise
    return simulateAsyncOperation('Chained promise', 500);
  })
  .then(result => {
    console.log(`Chained result: ${result}`);
  })
  .catch(error => {
    console.error(`Promise error: ${error}`);
  });

// Promise.all example - run multiple promises in parallel
Promise.all([
  simulateAsyncOperation('Promise.all 1', 1000),
  simulateAsyncOperation('Promise.all 2', 800),
  simulateAsyncOperation('Promise.all 3', 1200)
])
  .then(results => {
    console.log('All promises resolved:', results);
  })
  .catch(error => {
    console.error('At least one promise failed:', error);
  });

// ===== 3. ASYNC/AWAIT =====
console.log('\n3. ASYNC/AWAIT');

// Using async/await (syntactic sugar over promises)
async function asyncFunction() {
  try {
    // Sequential execution
    const result1 = await simulateAsyncOperation('Async/await data', 2000);
    console.log(`Async/await result 1: ${result1}`);
    
    const result2 = await simulateAsyncOperation('Sequential async data', 500);
    console.log(`Async/await result 2: ${result2}`);
    
    // Parallel execution with async/await
    const parallelResults = await Promise.all([
      simulateAsyncOperation('Parallel 1', 700),
      simulateAsyncOperation('Parallel 2', 900)
    ]);
    console.log('Parallel results with async/await:', parallelResults);
    
  } catch (error) {
    console.error(`Async/await error: ${error}`);
  }
}

// Execute the async function
asyncFunction();

// ===== COMPARISON =====
console.log('\n===== COMPARISON =====');
console.log('Callbacks: Simple but can lead to callback hell');
console.log('Promises: Chainable, better error handling');
console.log('Async/Await: Clean, synchronous-looking code');

// Run with: node simple_async_techniques.js
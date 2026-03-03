/**
 * 02_callbacks_promises_async.js
 * 
 * This script demonstrates different approaches to asynchronous JavaScript:
 * - Callbacks
 * - Promises
 * - Async/Await
 * 
 * Each approach is compared with pros and cons.
 */

console.log('===== ASYNCHRONOUS JAVASCRIPT APPROACHES =====');

// Simulating an asynchronous operation (e.g., fetching data from a server)
function fetchData(id, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve(`Data for ID ${id}`);
      } else {
        reject('Invalid ID');
      }
    }, delay);
  });
}

// ===== 1. CALLBACKS =====
console.log('\n1. CALLBACKS');
console.log('Callbacks are functions passed as arguments to other functions, to be executed later.');

function fetchWithCallback(id, callback, errorCallback) {
  setTimeout(() => {
    if (id > 0) {
      callback(`Data for ID ${id} (via callback)`);
    } else {
      errorCallback('Invalid ID (via callback)');
    }
  }, 1000);
}

console.log('Fetching data with callbacks...');
fetchWithCallback(
  123,
  (data) => console.log(`Success: ${data}`),
  (error) => console.error(`Error: ${error}`)
);

// Callback hell example (nested callbacks)
console.log('\nCallback Hell Example:');
fetchWithCallback(1, (data1) => {
  console.log(`First: ${data1}`);
  fetchWithCallback(2, (data2) => {
    console.log(`Second: ${data2}`);
    fetchWithCallback(3, (data3) => {
      console.log(`Third: ${data3}`);
      console.log('Callback hell completed');
    }, (error) => console.error(error));
  }, (error) => console.error(error));
}, (error) => console.error(error));

// ===== 2. PROMISES =====
setTimeout(() => {
  console.log('\n2. PROMISES');
  console.log('Promises represent a value that might be available now, later, or never.');

  console.log('Fetching data with promises...');
  fetchData(456, 1000)
    .then(data => {
      console.log(`Success: ${data}`);
      return fetchData(457, 500);
    })
    .then(data => {
      console.log(`Success again: ${data}`);
      return fetchData(0, 500); // This will cause an error
    })
    .then(data => {
      console.log(`This won't execute: ${data}`);
    })
    .catch(error => {
      console.error(`Caught error: ${error}`);
    })
    .finally(() => {
      console.log('Promise chain completed (finally)');
    });

  // Promise.all example
  console.log('\nPromise.all Example:');
  Promise.all([
    fetchData(1, 800),
    fetchData(2, 400),
    fetchData(3, 1200)
  ])
    .then(results => {
      console.log('All promises resolved:', results);
    })
    .catch(error => {
      console.error('At least one promise rejected:', error);
    });

  // ===== 3. ASYNC/AWAIT =====
  setTimeout(() => {
    console.log('\n3. ASYNC/AWAIT');
    console.log('Async/await is syntactic sugar over promises, making async code look synchronous.');

    async function fetchSequential() {
      try {
        console.log('Starting sequential fetch...');
        const data1 = await fetchData(789, 1000);
        console.log(`First await: ${data1}`);
        
        const data2 = await fetchData(790, 500);
        console.log(`Second await: ${data2}`);
        
        // This will throw an error
        try {
          const data3 = await fetchData(0, 500);
          console.log(`Third await: ${data3}`);
        } catch (error) {
          console.error(`Caught inner error: ${error}`);
        }
        
        console.log('Sequential fetch completed');
      } catch (error) {
        console.error(`Caught outer error: ${error}`);
      }
    }

    fetchSequential();

    // Parallel execution with async/await
    setTimeout(() => {
      async function fetchParallel() {
        try {
          console.log('\nStarting parallel fetch...');
          const promises = [
            fetchData(101, 800),
            fetchData(102, 400),
            fetchData(103, 1200)
          ];
          
          const results = await Promise.all(promises);
          console.log('Parallel results:', results);
        } catch (error) {
          console.error(`Parallel error: ${error}`);
        }
      }

      fetchParallel();

      // ===== COMPARISON =====
      setTimeout(() => {
        console.log('\n===== COMPARISON OF APPROACHES =====');
        
        console.log('\nCALLBACKS:');
        console.log('✓ Simple and widely supported');
        console.log('✓ Low overhead');
        console.log('✗ Can lead to "callback hell" (nested callbacks)');
        console.log('✗ Error handling is complex');
        console.log('✗ No built-in composition');
        
        console.log('\nPROMISES:');
        console.log('✓ Better error handling with .catch()');
        console.log('✓ Chainable with .then()');
        console.log('✓ Composition with Promise.all(), Promise.race()');
        console.log('✗ Still requires chaining syntax');
        console.log('✗ Error handling can be missed if .catch() is omitted');
        
        console.log('\nASYNC/AWAIT:');
        console.log('✓ Cleaner, more readable syntax');
        console.log('✓ Try/catch for error handling');
        console.log('✓ Easier debugging (better stack traces)');
        console.log('✓ Can use with Promise composition methods');
        console.log('✗ Requires transpilation for older browsers');
        console.log('✗ Can make parallelization less obvious');
        
        console.log('\nRECOMMENDATION:');
        console.log('- Use async/await for most new code');
        console.log('- Understand promises as they underlie async/await');
        console.log('- Know callbacks for working with older APIs');
      }, 3000);
    }, 2000);
  }, 3000);
}, 3000);

// Run this script with: node 02_callbacks_promises_async.js
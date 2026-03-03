/**
 * Callbacks → Promises → Async/Await
 *
 * Three approaches to the same problem: sequential async operations.
 */

// Simulated async data fetch
const fetchData = (id, delay) => new Promise((resolve, reject) => {
    setTimeout(() => {
        id > 0 ? resolve(`Data for ID ${id}`) : reject('Invalid ID');
    }, delay);
});


// ===== 1. CALLBACKS =====

function fetchWithCallback(id, onSuccess, onError) {
    setTimeout(() => {
        id > 0 ? onSuccess(`Data for ID ${id}`) : onError('Invalid ID');
    }, 300);
}

console.log('--- 1. Callbacks ---');

// Callback hell: nested callbacks for sequential operations
fetchWithCallback(1, (data1) => {
    console.log('CB:', data1);
    fetchWithCallback(2, (data2) => {
        console.log('CB:', data2);
        fetchWithCallback(3, (data3) => {
            console.log('CB:', data3);

            runPromises();  // continue to next section
        }, console.error);
    }, console.error);
}, console.error);


// ===== 2. PROMISES =====

function runPromises() {
    console.log('\n--- 2. Promises ---');

    // Chaining: flat, readable, single .catch for all errors
    fetchData(1, 300)
        .then(data => { console.log('Promise:', data); return fetchData(2, 300); })
        .then(data => { console.log('Promise:', data); return fetchData(3, 300); })
        .then(data => { console.log('Promise:', data); })
        .catch(err => console.error('Error:', err))
        .finally(() => {
            // Promise.all: parallel execution
            console.log('\nPromise.all (parallel):');
            Promise.all([fetchData(10, 200), fetchData(20, 100), fetchData(30, 300)])
                .then(results => {
                    console.log('All resolved:', results);
                    runAsyncAwait();  // continue to next section
                });
        });
}


// ===== 3. ASYNC/AWAIT =====

async function runAsyncAwait() {
    console.log('\n--- 3. Async/Await ---');

    // Sequential — reads like synchronous code
    try {
        const d1 = await fetchData(1, 300);
        console.log('Await:', d1);
        const d2 = await fetchData(2, 300);
        console.log('Await:', d2);
        const d3 = await fetchData(3, 300);
        console.log('Await:', d3);
    } catch (err) {
        console.error('Error:', err);
    }

    // Parallel with async/await
    console.log('\nawait Promise.all (parallel):');
    const results = await Promise.all([fetchData(10, 200), fetchData(20, 100), fetchData(30, 300)]);
    console.log('All resolved:', results);

    console.log('\n--- Summary ---');
    console.log('Callbacks: simple but nests badly');
    console.log('Promises:  chainable, single .catch');
    console.log('Async/await: cleanest, use try/catch');
}

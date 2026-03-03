## LV05 — Async JS + AJAX (bridge exercise)

### Objectives
- Understand JavaScript's event loop and asynchronous execution
- Compare callbacks, Promises, and async/await
- Make HTTP requests with XMLHttpRequest and Fetch API
- Connect frontend DOM skills (LV04) to a backend API

### How to Run
```bash
# Node exercises:
npm run async-basics        # 01 — event loop, setTimeout, var vs let in loops
npm run callbacks-promises  # 02 — callbacks → promises → async/await comparison

# Browser exercises (two terminals):
npm run server              # starts Todo API on port 3001
npm start                   # serves HTML files on port 3000
```
Open http://localhost:3000 — browse to `03-ajax-examples.html` and `04-todo-ajax.html`.

### Exercises

1. **01-async-basics.js** — Event loop demo: sync vs async execution order, the classic `var` loop problem and `let` fix.
2. **02-callbacks-promises.js** — Same sequential fetch done three ways: nested callbacks (callback hell), promise chains, async/await. Includes `Promise.all` for parallel execution.
3. **03-ajax-examples.html** — Browser AJAX: XMLHttpRequest vs Fetch (promises) vs Fetch (async/await) vs Promise.all. Click buttons, see results from a public API.
4. **04-todo-ajax.html** — Fetches todos from `server.js` and renders them as DOM elements. Connects LV04 DOM skills to server communication.

### Assignment (15–20 min)

Open **00-assignment.js**. Write three versions of the same task — return the value 42 after a 1-second delay:

1. `withCallback(callback)` — calls `callback(42)` after 1s using `setTimeout`
2. `withPromise()` — returns a `new Promise` that resolves to 42 after 1s
3. `withAsyncAwait()` — async function that awaits the promise version

Call all three and log `"got value: 42"` from each. Run with `npm run assignment`.

### Lecture Reference
RWA03/RWA05 — Event loop, callbacks, promises, async/await, XMLHttpRequest, Fetch API

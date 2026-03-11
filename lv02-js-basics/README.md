## LV02 — JavaScript Basics (RWA03)

### Objectives
- Understand JavaScript primitive types and objects
- Work with arrays, functions, and higher-order functions
- Understand hoisting, scope, and variable declarations
- Learn modern JS: `let`/`const`, arrow functions, template literals, spread/destructuring

### How to Run
```bash
npm run types          # run 01-types.js
npm run arrays         # run 02-arrays.js
npm run functions      # run 03-functions.js
npm run nested         # run 04-nested-functions.js
npm run higher-order   # run 05-higher-order-functions.js
npm run hoisting       # run 06-hoisting.js
npm run scope          # run 07-scope.js
npm run objects        # run 08-objects.js
npm run let-const      # run 09-let-const.js
npm run for-in-of      # run 10-for-in-of.js
npm run assignment     # run assignment.js
```

### Exercises

Each file has two parts: Part 1 uses `var` and ES5 syntax, Part 2 shows the modern equivalent.

1. **01-types.js** — Primitives (boolean, null, undefined, number, string) and objects. Part 2: `let`/`const`, template literals.
2. **02-arrays.js** — Array basics, mixed types. Part 2: spread operator, destructuring, `Array.from`.
3. **03-functions.js** — Declaration, expression, return values. Part 2: arrow functions, default parameters.
4. **04-nested-functions.js** — Functions inside functions. Part 2: nested arrow functions, currying.
5. **05-higher-order-functions.js** — Callbacks, `map`, `filter`. Part 2: arrow callbacks, `reduce`, chaining.
6. **06-hoisting.js** — Variable and function hoisting. Part 2: why `let`/`const` make hoisting irrelevant.
7. **07-scope.js** — Function scope, IIFE, global leaks. Part 2: block scoping with `let`/`const`.
8. **08-objects.js** — Object literals, dot/bracket notation. Part 2: shorthand properties, methods, computed keys, destructuring.
9. **09-let-const.js** — `var` vs `let` vs `const`, block scoping, Temporal Dead Zone.
10. **10-for-in-of.js** — `for...in` (object keys) vs `for...of` (iterable values).

### Assignment (15–20 min)

Open **assignment.js**. Write a function `summarize(arr)` that:
- Takes an array of mixed values
- Returns an object `{ numbers: N, strings: N, booleans: N }` with counts of each type
- Uses `typeof`, a `for` loop, and an object literal

Test with: `summarize([1, 'hello', true, 42, 'world', false, 7])` → `{ numbers: 3, strings: 2, booleans: 2 }`

Run with `npm run assignment`.

### Lecture Reference
RWA03 — JavaScript types, arrays, functions, hoisting, scope, objects, `let`/`const`, `for...in`/`for...of`

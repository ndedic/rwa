## LV03 — JavaScript Advanced (RWA04)

### Objectives
- Understand different ways to create objects (factory, constructor, prototype)
- Master the `this` keyword and its dynamic behavior
- Use `call`, `apply`, `bind` to control context
- Implement inheritance with ES5 prototype chains and ES6 classes
- Understand closures

### How to Run
```bash
npm run factory          # 01 — factory function
npm run constructor      # 02 — constructor function
npm run prototype        # 03 — constructor + prototype chain
npm run object-create    # 04 — Object.create, defineProperty
npm run this             # 05 — this + var that = this pattern
npm run this-bind        # 05a — this + bind pattern
npm run call-apply-bind  # 06 — call, apply, bind
npm run inheritance      # 07 — ES5 prototype inheritance
npm run inheritance-es6  # 07 — ES6 class inheritance (same hierarchy)
npm run closure          # 08 — closures
npm run cplx             # 09 — complex number prototype example
npm run es6              # 10 — ES6+ primer (classes, arrows, destructuring)
npm run assignment       # 00 — assignment
```

### Exercises

1. **01-factory.js** — Factory function returning object literals. Validation, private state via closure.
2. **02-constructor.js** — Constructor function with `new`. Methods on `this`.
3. **03-constructor-prototype.js** — Methods on prototype instead of `this`. Shared across instances.
4. **04-builtin-object-constructor.js** — `Object.create`, property descriptors, getters/setters.
5. **05-this.js** — `this` in setInterval with `var that = this` workaround.
6. **05a-this.js** — Same problem solved with `.bind(this)`.
7. **07-inheritance.js** — ES5: Person → Employee → Manager via prototype chain.
8. **07-inheritance-updated.js** — ES6: same hierarchy with class/extends/super.
9. **08-closure.js** — StringJoiner: private `items` array accessed via closure.
10. **09-cplx-prototype.js** — Complex number with add/multiply on prototype.
11. **10-es6plus-primer.js** — ES6+ features: let/const, arrows, classes, destructuring, spread, rest.

Run 07 and 07-updated back to back to see the same output from both patterns.

### Assignment (15–20 min)

Open **00-assignment.js**. Build a `Vehicle` → `Car` hierarchy two ways:

**Part A — ES5:** `Vehicle(make, year)` constructor, `describe()` on prototype returns `"make (year)"`. `Car` inherits via `Object.create`, adds `doors`, overrides `describe()` to return `"make (year), N doors"`.

**Part B — ES6:** Same hierarchy using `class`/`extends`/`super`.

Test: `new Car('Toyota', 2020, 4).describe()` → `"Toyota (2020), 4 doors"`

Run with `npm run assignment`.

### Lecture Reference
RWA04 — Object creation patterns, prototype chain, this, call/apply/bind, inheritance, closures, ES6 classes

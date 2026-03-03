/**
 * Assignment: Vehicle/Car hierarchy — ES5 prototype chain + ES6 class
 *
 * Part A — ES5 (prototype chain):
 *   1. Create a Vehicle constructor with properties: make, year
 *   2. Add a describe() method on Vehicle.prototype that returns
 *      "make (year)" e.g. "Toyota (2020)"
 *   3. Create a Car constructor that inherits from Vehicle
 *      (use Object.create for the prototype, call Vehicle.apply in constructor)
 *   4. Car adds a doors property
 *   5. Override describe() on Car.prototype to return
 *      "make (year), doors doors" e.g. "Toyota (2020), 4 doors"
 *
 * Part B — ES6 (class/extends):
 *   Rewrite the same hierarchy using class, constructor, extends, super.
 *
 * Test both:
 *   const v = new Vehicle('Honda', 2018);
 *   const c = new Car('Toyota', 2020, 4);
 *   console.log(v.describe());  // Honda (2018)
 *   console.log(c.describe());  // Toyota (2020), 4 doors
 *
 * Run: npm run assignment
 */

// Part A — ES5:


// Part B — ES6:

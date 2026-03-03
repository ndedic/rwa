/**
 * Inheritance — ES5 prototype chain
 * (See 07-inheritance-updated.js for the ES6 class version of the same hierarchy)
 *
 * Pattern: Person → Employee → Manager
 * Each level adds properties and methods via prototype.
 */

var Person = function ( name ) {
   console.log( 'Invoking Person constructor on: ', arguments );
   this.name = name;
};

Person.prototype.getName = function () {
   return this.name;
};

//---

var Employee = function ( name, salary ) {
   console.log( 'Invoking Employee constructor on: ', arguments );
   Person.apply( this, arguments );
   this.salary = salary;
};

// Object.create sets up the prototype chain without calling the parent constructor
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.getSalary = function () {
   return this.salary;
};

//---

var Manager = function ( name, salary, department ) {
   console.log( 'Invoking Manager constructor on: ', arguments );
   Employee.apply( this, arguments );
   this.department = department;
};

Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;

Manager.prototype.getDepartment = function () {
   return this.department;
};

//---

var a = new Person( 'Alice' );
var b = new Employee( 'Bob', 15000 );
var c = new Manager( 'Charlotte', 30000, 'Communications' );

console.log( a.getName() );
console.log( b.getName(), b.getSalary() );
console.log( c.getName(), c.getSalary(), c.getDepartment() );

// Verify the prototype chain
console.log('\nPrototype chain:');
console.log( 'b instanceof Employee:', b instanceof Employee );  // true
console.log( 'b instanceof Person:', b instanceof Person );      // true
console.log( 'c instanceof Manager:', c instanceof Manager );    // true
console.log( 'c instanceof Person:', c instanceof Person );      // true

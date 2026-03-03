/**
 * Inheritance — ES6 class syntax
 * (See 07-inheritance.js for the ES5 prototype version of the same hierarchy)
 *
 * Same pattern: Person → Employee → Manager
 * class/extends/super replaces the manual prototype wiring.
 */

class Person {
    constructor(name) {
        console.log('Invoking Person constructor on: ', arguments);
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

class Employee extends Person {
    constructor(name, salary) {
        console.log('Invoking Employee constructor on: ', arguments);
        super(name);
        this.salary = salary;
    }

    getSalary() {
        return this.salary;
    }
}

class Manager extends Employee {
    constructor(name, salary, department) {
        console.log('Invoking Manager constructor on: ', arguments);
        super(name, salary);
        this.department = department;
    }

    getDepartment() {
        return this.department;
    }
}

const a = new Person('Alice');
const b = new Employee('Bob', 15000);
const c = new Manager('Charlotte', 30000, 'Communications');

console.log(a.getName());
console.log(b.getName(), b.getSalary());
console.log(c.getName(), c.getSalary(), c.getDepartment());

// Same prototype chain, cleaner syntax
console.log('\nPrototype chain:');
console.log('b instanceof Employee:', b instanceof Employee);  // true
console.log('b instanceof Person:', b instanceof Person);      // true
console.log('c instanceof Manager:', c instanceof Manager);    // true
console.log('c instanceof Person:', c instanceof Person);      // true

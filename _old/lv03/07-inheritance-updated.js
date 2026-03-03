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
        console.log(salary);
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

// Creating instances
const a = new Person('Alice');
const b = new Employee('Bob', 15000);
const c = new Manager('Charlotte', 30000, 'Communications');

// Testing the methods
console.log(a.getName());
console.log(b.getName(), b.getSalary());
console.log(c.getName(), c.getSalary(), c.getDepartment());

console.log(b instanceof Employee);

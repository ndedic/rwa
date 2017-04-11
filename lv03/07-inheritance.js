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
   console.log(salary)
};

Employee.prototype = new Person();
//Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Person;

Employee.prototype.getSalary = function () {

   return this.salary;
};

//---

var Manager = function ( name, salary, department ) {

   console.log( 'Invoking Manager constructor on: ', arguments );
   Employee.apply( this, arguments );
   this.department = department;
};

Manager.prototype = new Employee();
Manager.prototype.constructor = Employee;

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


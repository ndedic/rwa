/**
 * Constructor function with a prototype chain
 */

function Person(params) {

    this.params = params;
    var validationErrors = this.validate();
    
    if (validationErrors.length) {
        throw new Error('Person object expects the following properties to be defined: ' + validationErrors.join(','));
    }

    this.age = params.age;    
    this.firstName = params.firstName;
    this.lastName = params.lastName;
}

Person.prototype.validate = function () {
    
    var requiredProps = ['firstName', 'lastName', 'age'];
    var errors = [];

    for (var i in requiredProps) {
        if (!this.params.hasOwnProperty(requiredProps[i])) {
            errors.push(requiredProps[i]);
        }
    }

    return errors;
}     

Person.prototype.getAge = function () {
    return this.age;
};

Person.prototype.getFullName = function() {
    return this.firstName + ' ' + this.lastName;
};

Person.prototype.toString = function () {
    return 'firstName:' 
        + this.firstName 
        + ',lastName:' 
        + this.lastName 
        + ',email:' 
        + this.email 
        + ',age:' 
        + this.getAge()
        + ',fullName:'
        + this.firstName + ' ' + this.lastName;
};   

var p1 = new Person({firstName: 'John', lastName: 'Smith', age: 30});

console.log(p1.toString());

console.log(p1.constructor.name);

var p2 = new Person({firstName: 'Bob', lastName: 'Pike', age: 28});

console.log(p2.toString());

p2.age = 10;
p2.firstName = 'Alice';

console.log(p2.toString());
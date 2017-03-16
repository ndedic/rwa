/**
 * Constructor function
 */

function Person(params) {

    var validationErrors = validate(params);

    if (validationErrors.length) {
        throw new Error('Person object expects the following properties to be defined: ' + validationErrors.join(','));
    }
    
    this.firstName = params.firstName;
    this.lastName = params.lastName;

    function validate(params) {
        
        var requiredProps = ['firstName', 'lastName', 'age'];
        var errors = [];

        for (var i in requiredProps) {
            if (!params.hasOwnProperty(requiredProps[i])) {
                errors.push(requiredProps[i]);
            }
        }

        return errors;
    }     

    function getAge() {
        return age;
    }

    this.getFullName = function() {
        return this.firstName + ' ' + this.lastName;
    }

    this.toString = function () {
        return 'firstName:' 
            + this.firstName 
            + ',lastName:' 
            + this.lastName 
            + ',email:' 
            + this.email 
            + ',age:' 
            + getAge()
            + ',fullName:'
            + this.firstName + ' ' + this.lastName;
    }   
}

var p1 = new Person({firstName: 'John', lastName: 'Smith', age: 30});

console.log(p1.toString());

console.log(p1.constructor.name);

var p2 = new Person({firstName: 'Bob', lastName: 'Pike', age: 28});

console.log(p2.toString());

p2.age = 10;
p2.firstName = 'Alice';

console.log(p2.toString());
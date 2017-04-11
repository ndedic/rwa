/**
 * Factory function - a function which returns an object
 */
function createPerson(params) {
    
    var validationErrors = validate(params);

    if (validationErrors.length) {
        throw new Error('Person object expects the following properties to be defined: ' + validationErrors.join(','));
    }

    var age = params.age;
    var firstName = params.firstName;
    var lastName = params.lastName;

    function getAge() {
        return age;
    }

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

    return {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        toString: function () {
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
    };
}

var p1 = createPerson({firstName: 'John', lastName: 'Smith', age: 30});

console.log(p1.toString());

console.log(p1.constructor.name);

var p2 = createPerson({firstName: 'Bob', lastName: 'Pike', age: 28});

console.log(p2.toString());

p2.age = 10;
p2.firstName = 'Alice';

console.log(p2.toString());
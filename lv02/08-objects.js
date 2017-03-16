/**
 * Objects (literals, factories, constructors)
 */

// Object literal

var Person = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@fet.ba',
    getFullName : function () {
        return this.firstName + ' ' + this.lastName;
    },
    'date of birth': new Date('02/03/1984')
};

// dot notation
console.log(Person.firstName);
// 'static' method call
console.log(Person.getFullName());
//undefined
console.log(Person.relatives);
// string with spaces
console.log(Person['date of birth']);
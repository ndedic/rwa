function add(x, y) {
    var res =  x + y;
    console.log(res);
    return res;
}

function invoke(fn, x, y) {
    fn(x, y);
    fn.call(null, x, y);
    fn.apply(null, [x, y]);
}

invoke(add, 3, 4);

//

function User(name) {
    this.name = name;
    this.age;
}
User.prototype.getName = function () {
    return this.name;
};
User.prototype.setAge = function (age) {
    this.age = age;
    return this;
};

this.name = "Global";

var bob = new User('Bob');;
var alice = new User('Alice');

console.log( bob.getName() );
console.log( bob.getName.call(alice) );

var getName = User.prototype.getName;

var getNameBoundToGlobal = getName.bind(this);

var getNameBoundToAlice = getName.bind(alice);

var getNameBoundToBob = getName.bind(bob);

console.log(getNameBoundToGlobal(), getNameBoundToAlice(), getNameBoundToBob());
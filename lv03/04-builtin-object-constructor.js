/**
 * The Object constructor
 * more @ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
 */

var obj1 = Object.create({}, {
  prop: {
    value: 42,
    writable: true,
    enumerable: true,
    configurable: true
  }
});

console.log(obj1.prop);

var user = {
  sayHello: function() {
    console.log('Hello '+ this.name);
  }
};

var bob = Object.create(user, {
  'name': {
    value: 'Bob',
    enumerable: true // writable:false, configurable(deletable):false by default
  }
});

bob.name = 'alice';

console.log(bob.name);

// custom getters and setters

function Archiver() {

  var temperature = null;
  var archive = [];

  Object.defineProperty(this, 'temperature', {
    get: function() {
      console.log('get!');
      return temperature;
    },
    set: function(value) {
      temperature = value;
      archive.push({ val: temperature });
    }
  });

  this.getArchive = function() { return archive; };
}

var arc = new Archiver();
arc.temperature; // 'get!'
arc.temperature = 11;
arc.temperature = 13;
arc.temperature = 15;
console.log( arc.getArchive() ); // [{ val: 11 }, { val: 13 }]
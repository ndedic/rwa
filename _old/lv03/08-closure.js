function StringJoiner(separator) {
    var items = [];
    this.add = function (str) {
        items.push(str);
    };
    this.toString = function () {
        return items.join(separator);
    };
}

var sj = new StringJoiner(',');

sj.add('one');
sj.add('two');
sj.add('three');

console.log( sj.toString() );
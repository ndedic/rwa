function StringJoiner(separator) {
    var joiner = [];
    this.join = function (str) {
        joiner.push(str);
    };
    this.toString = function () {
        return joiner.join(separator);
    };
}

var sj = new StringJoiner(',');

sj.join('one');
sj.join('two');
sj.join('three');

console.log( sj.toString() );
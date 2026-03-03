/**
 * Complex number — prototype example
 *
 * Cplx represents a complex number (real + imaginary).
 * Demonstrates: constructor, prototype methods, toString.
 */

function Cplx(re, im) {
    this.re = re;
    this.im = im;
}

Cplx.prototype.add = function (other) {
    return new Cplx(this.re + other.re, this.im + other.im);
};

Cplx.prototype.multiply = function (other) {
    // (a+bi)(c+di) = (ac-bd) + (ad+bc)i
    return new Cplx(
        this.re * other.re - this.im * other.im,
        this.re * other.im + this.im * other.re
    );
};

Cplx.prototype.toString = function () {
    if (this.im === 0) return '' + this.re;
    if (this.re === 0) return this.im + 'i';
    var sign = this.im > 0 ? '+' : '';
    return this.re + sign + this.im + 'i';
};

// --- Usage ---

var a = new Cplx(3, 2);   // 3+2i
var b = new Cplx(1, -4);  // 1-4i

console.log('a =', a.toString());           // 3+2i
console.log('b =', b.toString());           // 1-4i
console.log('a + b =', a.add(b).toString());       // 4-2i
console.log('a * b =', a.multiply(b).toString());  // 11-10i

// Verify: (3+2i)(1-4i) = 3-12i+2i-8i² = 3-10i+8 = 11-10i ✓

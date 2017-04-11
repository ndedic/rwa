/**
 * Nested functions
 */

function outer() {

    function inner() {
        return 10;
    };

    return inner() + 20;
}

console.log( outer() );
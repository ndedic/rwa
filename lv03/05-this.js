function Counter() {
    this.value = 0;
    this.interval = 1 * 500;
    this.id = null;
}

Counter.prototype.increment = function () {
    this.value++;
};

Counter.prototype.start = function () {
    var that = this;
    this.id = setInterval(function () {
        that.increment();
        that.display();
        if (that.value >= 20) {
            that.stop();
        }
    }, this.interval);
};

Counter.prototype.display = function () {
    console.log(this.value);
};

Counter.prototype.stop = function () {
    clearInterval(this.id);
};

var c = new Counter();

c.start();
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
    var incrementAndDisplay = function () {
        this.increment();
        this.display();
        if (this.value >= 20) {
            this.stop();
        }
    };
    this.id = setInterval(incrementAndDisplay.bind(this), this.interval);
};

Counter.prototype.display = function () {
    console.log(this.value);
};

Counter.prototype.stop = function () {
    clearInterval(this.id);
};

var c = new Counter();

c.start();
var Clock = require('./clock')

class ExtendedClock extends Clock {
    constructor({ template, precision }) {
        super({ template })
        this._precision = precision
    }

    start() {
        this._render();
        this._timer = setInterval(() => this._render(), this._precision);
    }
}

// let clock = new Clock({
    // template: 'h:m:s'
// })
// clock.start()

let clock = new ExtendedClock({
    template: 'h:m:s',
    precision: 5000
});
clock.start()

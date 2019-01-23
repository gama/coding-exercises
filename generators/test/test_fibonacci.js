var fibonacci = require('../fibonacci').fibonacci
var assert    = require('assert')

describe('Fibonacci generator', function () {
    it('should return a fibonacci sequence of numbers', function () {
        let fib    = fibonacci()
        let values = [...Array(10)].map(() => fib.next().value)
        assert.deepEqual(values, [1, 1, 2, 3, 5, 8, 13, 21, 34, 55])
    })
})

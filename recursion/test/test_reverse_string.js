var reverse = require('../reverse_string').reverse;
var assert  = require('assert');

describe('Reverse String', function () {
    it('should reverse a string with a single char', function () {
        assert.equal(reverse('a'), 'a');
    });

    it('should reverse a string with two chars', function () {
        assert.equal(reverse('ab'), 'ba');
    });

    it('should reverse a string with an even number of chars', function () {
        assert.equal(reverse('abdef'), 'fedba');
    });

    it('should reverse a string with an odd number of chars', function () {
        assert.equal(reverse('abdefg'), 'gfedba');
    });

    it('should reverse a string with unicode chars', function () {
        assert.equal(reverse("<💩><👽><✔>"), ">\u2714<>\u{1F47D}<>\u{1F4A9}<");
    });
});

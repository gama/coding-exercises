var _reverseCodePoints = function (string) {
    var codepoints = Array.from(string);
    if (codepoints.length == 1)
        return codepoints;
    return reverse(codepoints.slice(1).join('')) + codepoints[0];
};

var reverse = function (string) {
    if (string.codePointAt(0) > 0xFFFF)
        return _reverseCodePoints(string);

    if (string.length === 1)
        return string
    return reverse(string.substr(1)) + string[0]
};

exports.reverse = reverse;

var calculate = {};

calculate.findByMaxValue = function (maxValue) {
    var max = parseInt(maxValue), isFound;
    for (var i = max; i > 1; i--) {
        isFound = true;
        for (var j = 2; j <= max / 2; j++) {
            if (i % j === 0) {
                isFound = false;
                break;
            }
        }
        if (isFound) {
            return i;
        }
    }
    return null;
};

module.exports = calculate;
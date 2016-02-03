var http = require('http'),
    router = require('./routing'),
    calculate = require('./calculate');

router.allowCrossOrigin();

router.create('/prime-number', 'POST', function (req, res) {
    var start = Date.now();
    var result = calculate.findByMaxValue(req.params.maxValue);
    var end = Date.now();

    var data = JSON.stringify({
        number: result,
        time: end-start
    });
    res.end(data);
});

router.create('/prime-number', 'OPTIONS', function (req, res) {res.end()});

module.exports = function () {
    http.createServer(function (request, response) {
        router.check(request, response);
    }).listen(3000);
};
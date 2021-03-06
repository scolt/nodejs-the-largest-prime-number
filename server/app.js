'use strict';

let express = require("express"),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    cluster = require('cluster'),
    calculate = require('./components/calculate'),
    time = require('./components/time'),
    logger = require('./components/logger'),
    app = express(),
    port = 1222;

let clustering = require('./components/clusters');

clustering.init(function () {
    app.
    use(cors()).
    use(bodyParser.json()).
    use(time).
    post('/prime-number', function (req, res) {
        let value = req.body.maxValue;
        if (!value) {
            res.status(500).end('maxValue not provided');
        } else if (typeof value  === 'string' && isNaN(parseInt(value))) {
            res.status(500).end('maxValue should be a valid number');
        } else {
            let result = calculate.findByMaxValue(value);
            let data = JSON.stringify({
                number: result
            });
            res.end(data);
        }
    });
    app.listen(port, () => {logger.info(`Server listening at ${port}`);});
}, function (message) {
    if (message.type && message.type === 'averageTime') {
        logger.info(`Average response time for process ${message.worker}: ${message.message}ms`)
    }
});




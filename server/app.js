'use strict';

let express = require("express"),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    calculate = require('./components/calculate'),
    app = express(),
    port = 1222;

app.
    use(cors()).
    use(bodyParser.json())
    .post('/prime-number', function (req, res) {
        var start = Date.now();

        var value = req.body.maxValue;
        if (!value) {
            res.status(500).end('maxValue not provided');
        } else if (typeof value  === 'string' && isNaN(parseInt(value))) {
            res.status(500).end('maxValue should be a valid number');
        } else {
            var result = calculate.findByMaxValue(value);
            var end = Date.now();

            var data = JSON.stringify({
                number: result,
                time: end-start
            });
            res.end(data);
        }
    });

app.listen(port, () => {console.log(`${new Date()} Listening at ${port}`);});
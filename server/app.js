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
        var result = calculate.findByMaxValue(req.body.maxValue);
        var end = Date.now();

        var data = JSON.stringify({
            number: result,
            time: end-start
        });
        res.end(data);
    });

app.listen(port, () => {console.log(`${new Date()} Listening at ${port}`);});
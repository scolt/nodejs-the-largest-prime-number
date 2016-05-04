'use strict';

let express = require("express"),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    calculate = require('./components/calculate'),
    time = require('./components/time'),
    app = express(),
    port = 1222;

app.
    use(cors()).
    use(bodyParser.json()).
    use(time)
    .post('/prime-number', function (req, res) {
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

app.listen(port, () => {console.log(`${new Date()} Listening at ${port}`);});
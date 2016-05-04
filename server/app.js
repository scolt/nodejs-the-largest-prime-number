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

if (cluster.isMaster) {
    let numWorkers = require('os').cpus().length;
    logger.info(`Master cluster setting up ${numWorkers} workers...`);

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        logger.debug(`Worker ${worker.process.pid} is online`);
    });

    cluster.on('exit', function(worker, code, signal) {
        logger.debug(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}. Starting a new worker`);
        cluster.fork();
    });

} else {
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
}



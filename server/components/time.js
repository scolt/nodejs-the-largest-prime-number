'use strict';
module.exports = responseTime;

let logger = require('./logger'),
    clusterActions = require('./clusters');

let averageTime = {
    sum: 0,
    count: 0
};

function responseTime(req, res, next) {
    let startTime = process.hrtime();
    let resOriginEnd = res.end;
    logger.silly(`Process ${process.pid} is starting processing request`);

    res.end = function () {
        let diff = process.hrtime(startTime);
        let time = diff[0] * 1e3 + diff[1] * 1e-6;
        logger.silly(`Process ${process.pid} finished processing request after ${time}ms`);
        res.setHeader("Response-Time", time);
        clusterActions.sendToMaster({
            type: 'averageTime',
            message: getMiddleTime(time)
        });
        resOriginEnd.apply(this, arguments);
    };
    next();
}

function getMiddleTime(time) {
    averageTime.sum += time;
    averageTime.count++;
    return averageTime.sum / averageTime.count;
}
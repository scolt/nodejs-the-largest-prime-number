'use strict';
module.exports = responseTime;

function responseTime(req, res, next) {
    let startTime = process.hrtime();
    let resOriginEnd = res.end;

    res.end = function () {
        let diff = process.hrtime(startTime);
        let time = diff[0] * 1e3 + diff[1] * 1e-6;
        res.setHeader("Response-Time", time);
        resOriginEnd.apply(this, arguments);
    };

    next();
}
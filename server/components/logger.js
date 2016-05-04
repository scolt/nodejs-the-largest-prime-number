'use strict';

let winston = require('winston');
module.exports = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: "silly",
            handleExceptions: true,
            prettyPrint: true,
            timestamp: true
        })
    ],
    exitOnError: false
});
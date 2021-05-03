'use strict';
let cluster = require('cluster'),
    logger = require('./logger');

var clusterActions = {};

/**
 * Initialize clusters for any application
 * @param {function} instance - one instance of app which should be start for every worker
 * @param {function} onMessageFromChild - callback for processing any messages in master from children
 */
clusterActions.init = function (instance, onMessageFromChild) {
    if (cluster.isMaster) {
        let numWorkers = require('os').cpus().length;
        logger.info(`Master cluster setting up ${numWorkers} workers...`);

        for(var i = 0; i < numWorkers; i++) {
            cluster.fork();
        }

        cluster.on('online', function(worker) {
            worker.on('message', function (message) {
                if (onMessageFromChild) onMessageFromChild(message);
            });
            logger.debug(`Worker ${worker.process.pid} is online`);
        });

        cluster.on('exit', function(worker, code, signal) {
            logger.debug(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}. Starting a new worker`);
            cluster.fork();
        });
    } else {
        instance();
    }
};


/**
 * Send message from worker to master
 * @param {object} value - object for send to master
 */
clusterActions.sendToMaster = function (value) {
    if (!value) value = {};
    value.worker = process.pid;
    process.send(value);
};

module.exports = clusterActions;

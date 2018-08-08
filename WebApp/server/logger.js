'use strict';

const fs = require('fs');
const path = require('path');
const winston = require('winston');
require('winston-daily-rotate-file');
const common = require('./commonNodeJSUtility.js');

const folderName = 'logs';

const dailyRotateFile = new (winston.transports.DailyRotateFile)({
    filename: `${folderName}/app-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});
const format = winston.format;
const logger = winston.createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.simple()
    ),
    transports: [
        dailyRotateFile
    ]
});



const accessLogStream = fs.createWriteStream(path.join(__dirname, `../${folderName}/access.log`), { flags: 'a' });


module.exports = {
    accessLogStream: accessLogStream,
    info: msg => logger.info(common.deserializeSafely(msg)),
    debug: msg => logger.debug(common.deserializeSafely(msg)),
    error: msg => logger.error(common.deserializeSafely(msg)),
};
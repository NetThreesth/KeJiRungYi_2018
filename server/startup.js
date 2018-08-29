'use strict';

// [Basic]
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./logger');

const app = express();
app.use(morgan('combined', { stream: logger.accessLogStream }));
const setting = { limit: '50mb' };
app.use(bodyParser.urlencoded(Object.assign({ extended: false }, setting)));
app.use(bodyParser.json(setting));
app.use((err, req, res, next) => {
    logger.info(err);
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
    res.end();
});
const path = require('path').resolve(__dirname, `../app`);
app.use(express.static(path));
const PORT = 8080;
const server = app.listen(PORT, () => {
    logger.info(`App listening. serve path: ${path}, port: ${PORT}`);
    logger.info('Press Ctrl+C to quit.');
});
// [END Basic]


// [Advanced]
require('./socketIO.js').initSocketIO(server);
require('./apis.js').initAPIs(app);
require('./graphQL.js').initGraphQL(app);
// [END Advanced]


// [Reverse Proxy (For Assets)]
const proxy = require('http-proxy').createProxyServer();
proxy.on('error', err => logger.error(err));
const assetsServer = 'https://s3.amazonaws.com';
app.all("/3sth/*", (req, res) => {
    return proxy.web(req, res, { changeOrigin: true, target: assetsServer });
});
// [END Reverse Proxy]
'use strict';

// [Setup]
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

const apis = require('./apis.js');
apis.createAPIs(app);

const socketIO = require('./socketIO.js');
socketIO.createSocketIO(server);
// [END Setup]


// [Reverse Proxy (For Assets)]
const proxy = require('http-proxy').createProxyServer();
proxy.on('error', err => logger.error(err));
const assetsServer = 'https://s3.amazonaws.com';
app.all("/3sth/*", (req, res) => {
    logger.info('redirecting to assets server: ' + req.originalUrl);
    return proxy.web(req, res, { changeOrigin: true, target: assetsServer });
});
// [END Reverse Proxy]




// [GraphQL]
const express_graphql = require('express-graphql');
const graphql = require('graphql');
const repo = require('./repository.js');

const rootQuery = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        messages: {
            type: new graphql.GraphQLList(
                new graphql.GraphQLObjectType({
                    name: 'Message',
                    fields: {
                        id: { type: graphql.GraphQLInt },
                        time: { type: graphql.GraphQLString },
                        message: { type: graphql.GraphQLString },
                        name: { type: graphql.GraphQLString },
                        chatroomId: { type: graphql.GraphQLString },
                    }
                })
            ),
            resolve: () => repo.Message.findAll()
        },

        userLog: {
            type: new graphql.GraphQLList(
                new graphql.GraphQLObjectType({
                    name: 'UserLog',
                    fields: {
                        id: { type: graphql.GraphQLInt },
                        userName: { type: graphql.GraphQLString },
                        chatRoomIndex: { type: graphql.GraphQLString },
                        touchEventCount: { type: graphql.GraphQLInt },
                        signInTime: { type: graphql.GraphQLString },
                        stayTime: { type: graphql.GraphQLInt }
                    }
                })
            ),
            resolve: () => repo.UserLog.findAll()
        }
    }
});

app.use('/graphql', express_graphql({
    schema: new graphql.GraphQLSchema({ query: rootQuery }),
    graphiql: true
}));
// [END GraphQL]
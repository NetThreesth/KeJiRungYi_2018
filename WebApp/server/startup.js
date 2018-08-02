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
// [END Setup]


// [Reverse Proxy (For Assets)]
var proxy = require('http-proxy').createProxyServer();
proxy.on('error', err => logger.error(err));
var assetsServer = 'https://s3.amazonaws.com';
app.all("/3sth/*", (req, res) => {
    logger.info('redirecting to assets server: ' + req.originalUrl);
    return proxy.web(req, res, { changeOrigin: true, target: assetsServer });
});
// [END Reverse Proxy]


const backgroundParticles = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };


// [socket.io]
const io = require('socket.io')(server);
io.on('connection', socket => {
    socket.emit('updateBackgroundParticles', backgroundParticles);
});
// [END socket.io]



// [GraphQL]
/* const express_graphql = require('express-graphql');
const graphql = require('graphql');
const repo = require('./repository.js');

const MessageType = new graphql.GraphQLObjectType({
  name: 'Message',
  fields: {
    id: { type: graphql.GraphQLString },
    time: { type: graphql.GraphQLString },
    message: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    chatroomId: { type: graphql.GraphQLString },
  }
});

const rootQuery = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    messages: {
      type: new graphql.GraphQLList(MessageType),
      resolve: () => repo.Message.findAll()
    }
  }
});

app.use('/graphql', express_graphql({
  schema: new graphql.GraphQLSchema({ query: rootQuery }),
  graphiql: true
})); */
// [END GraphQL]



// [APIs]
app.route('/apis/uploadAlgaeImage').post((req, res, next) => {
    const body = req.body;
    return io.sockets.emit('uploadAlgaeImage', body);
});

app.route('/apis/uploadDeepAlMessage').post((req, res, next) => {
    const body = req.body;
    return io.sockets.emit('uploadDeepAlMessage', body);
});

app.route('/apis/uploadImage').post((req, res, next) => {
    logger.info(`${new Date()} uploadImage fired`);
    const body = req.body;
    if (!body) {
        logger.error(`image not exist`);
        res.status(400).send('image not exist');
        return;
    }

    //  Google Cloud Vision Api
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();
    const query = {
        image: {
            content: body.base64Image.split(',')[1]
        },
        features: [
            {
                "type": "LABEL_DETECTION",
                "maxResults": 6
            }
        ]
    };
    client.annotateImage(query)
        .then(results => {
            logger.info('Vision Api result:' + JSON.stringify(results));
            const labels = results[0].labelAnnotations;
            const descriptions = labels.map(label => label.description).join(' ');

            const Translate = require('@google-cloud/translate');
            const translate = new Translate();
            return translate.translate(descriptions, 'zh-TW');
        })
        .then(results => {
            let translations = results[0];
            translations = Array.isArray(translations) ? translations : [translations];
            const translationResult = translations.join('');
            logger.info('Translations: ' + translationResult);

            return sentToChatbots(translationResult, body.rid);
        })
        .then(result => {
            logger.info(result.data);
            res.json(result.data);
            res.end();
        })
        .catch(err => errorHandler(err, next));
});

app.route('/apis/uploadText').post((req, res, next) => {
    const text = req.body.text;
    const rid = req.body.rid;

    sentToChatbots(text, rid)
        .then(result => {
            logger.info(result.data);
            res.json(result.data);
            res.end();
        })
        .catch(err => errorHandler(err, next));
});

function sentToChatbots(text, rid) {
    const axios = require('axios');
    backgroundParticles[rid] += 1;
    io.sockets.emit('updateBackgroundParticles', backgroundParticles);

    setTimeout(function () {
        backgroundParticles[rid] -= 1;
        io.sockets.emit('updateBackgroundParticles', backgroundParticles);
    }, 30 * 60 * 1000);

    return axios.post('http://35.236.167.99:5000/3sth/api/v1.0/chatbots/', {
        msg: text,
        rid: rid
    });
};

app.route('/apis/getPoints').get((req, res, next) => {
    const fs = require('fs');
    fs.readFile('nineChatrooms.json', 'utf8', (err, content) => {
        if (err) errorHandler(err, next);

        const data = JSON.parse(content);
        const rate = 0.006;
        Object.keys(data).forEach((key, i) => {
            const nodesOfRoom = data[key]
            nodesOfRoom.forEach(n => {
                n.x = n.x * rate;
                n.y = n.y * rate;
                n.z = (Math.random() - Math.random()) * 2;
            });
        });

        res.json(data);
        res.end();
    });
});

function errorHandler(err, next) {
    logger.error(err);
    logger.error(err.message);
    if (next) next(err);
};
// [END APIs]
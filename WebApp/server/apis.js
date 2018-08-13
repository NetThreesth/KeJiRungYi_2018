'use strict';

const logger = require('./logger');
const common = require('./commonNodeJSUtility.js');
const { io, backgroundParticles } = require('./socketIO.js');
const repo = require('./repository.js');


module.exports.initAPIs = (app) => {

    app.route('/apis/uploadAlgaeImage').post((req, res, next) => {

        const body = req.body;
        body.base64Image = body.base64Image.replace(/b'/g, '').replace(/'/g, '');
        io.sockets.emit('uploadAlgaeImage', body);
        createParticle(body.rid, 'yellow', 0);
        res.send(true);
    });

    app.route('/apis/uploadDeepAlMessage').post((req, res, next) => {
        const body = req.body;

        repo.Message.create({
            time: new Date(),
            message: body.message,
            name: 'chatbot',
            chatroomId: body.rid,
        });
        io.sockets.emit('uploadDeepAlMessage', body);
        createParticle(body.rid, 'pink', 0);
        res.send(true);
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
                logger.info('Vision Api result:' + common.deserializeSafely(results));
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

                return sentToChatbots(translationResult, body.rid, body.userName).toPromise();
            })
            .then(result => {
                logger.info(result.data);
                res.json(result.data);
            })
            .catch(err => errorHandler(err, next));
    });

    app.route('/apis/uploadText').post((req, res, next) => {
        const body = req.body;

        sentToChatbots(body.text, body.rid, body.userName)
            .subscribe(
                result => {
                    logger.info(result.data);
                    res.json(result.data);
                },
                err => errorHandler(err, next)
            );
    });

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
        });
    });
};

function sentToChatbots(text, rid, userName) {

    repo.Message.create({
        time: new Date(),
        message: text,
        name: userName,
        chatroomId: rid,
    });
    createParticle(rid, 'white', 0);

    const { from } = require('rxjs');
    const { map } = require('rxjs/operators');
    const axios = require('axios');
    const observable = from(axios.post('http://35.236.167.99:5000/3sth/api/v1.0/chatbots/', {
        msg: text,
        rid: rid
    }));
    return observable.pipe(map(resp => {
        const now = new Date();
        createParticlesForResponse(rid);
        repo.Message.bulkCreate([
            {
                time: now,
                message: resp.data.chatbotResponse,
                name: 'chatbot',
                chatroomId: rid,
            },
            {
                time: now,
                message: resp.data.algaeResponse,
                name: 'algae',
                chatroomId: rid,
            },
            {
                time: now,
                message: resp.data.chatbot2algaeResponse,
                name: 'chatbot',
                chatroomId: rid,
            }
        ]);
        return resp;
    }));
};

function errorHandler(err, next) {
    logger.error(err);
    logger.error(err.message);
    if (next) next(err);
};

function createParticle(rid, color, delay) {
    if (!rid && rid !== 0) {
        return logger.error(`rid undefined, rid: ${rid}`);
    }

    const reduceTime = 0.5 * 60 * 1000;
    const particles = backgroundParticles[rid];
    setTimeout(() => {

        particles[color] += 1;
        logger.info(`rid: ${rid}, add ${color} to: ${particles[color]}`);

        setTimeout(() => {
            particles[color] -= 1;
            logger.info(`rid: ${rid}, reduce ${color} to: ${particles[color]}`);
        }, reduceTime);

    }, delay);
};

function createParticlesForResponse(rid) {
    createParticle(rid, 'pink', 0);
    createParticle(rid, 'pink', 0.5 * 1000);
    createParticle(rid, 'yellow', 3 * 1000);
    createParticle(rid, 'yellow', 6 * 1000);
    createParticle(rid, 'pink', 7 * 1000);
};
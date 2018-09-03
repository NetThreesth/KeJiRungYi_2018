'use strict';

const fs = require('fs');
const vision = require('@google-cloud/vision');
const { from } = require('rxjs');
const { map } = require('rxjs/operators');
const axios = require('axios');
const logger = require('./logger');
const common = require('./commonNodeJSUtility.js');
const { io, backgroundParticles } = require('./socketIO.js');
const repo = require('./repository.js');


module.exports.initAPIs = (app) => {

    app.route('/apis/uploadAlgaeImage').post((req, res, next) => {
        const body = req.body;

        repo.UploadedImage.create({
            time: new Date(),
            base64image: body.base64Image,
            name: 'algae',
            chatroomId: body.rid,
        }).catch(err => errorHandler(err, next));

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
        }).catch(err => errorHandler(err, next));

        io.sockets.emit('uploadDeepAlMessage', body);
        createParticle(body.rid, 'pink', 0);
        res.send(true);
    });


    app.route('/apis/getBaseline').get((req, res, next) => {
        if (!req.query.rid && req.query.rid !== 0) res.send('rid is required');
        repo.Baseline.findOne({
            where: { rid: req.query.rid },
            order: [['time', 'DESC']]
        }).then(data => res.json(data))
            .catch(err => errorHandler(err, next));
    });


    app.route('/apis/getMetaPattern').get((req, res, next) => {
        repo.MetaPattern.findOne({
            order: [['id', 'DESC']]
        }).then(data => res.json(data)).catch(err => next(err));
    });


    app.route('/apis/uploadImage').post((req, res, next) => {
        logger.info(`${new Date()} uploadImage fired`);
        const body = req.body;
        if (!body) {
            logger.error(`image not exist`);
            res.status(400).send('image not exist');
            return;
        }

        repo.UploadedImage.create({
            time: new Date(),
            base64image: body.base64Image,
            name: body.userName,
            chatroomId: body.rid,
        }).catch(err => errorHandler(err));

        //  Google Cloud Vision Api
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
            const dateDiff = Math.round(
                (new Date().getTime() - new Date(2018, 8 - 1, 15).getTime()) / (1000 * 60 * 60 * 24)
            );

            const result = {
                roomCenters: [],
                chatRoomsNodes: [],
                linesForChatRooms: []
            };

            forEachRoom(data, (nodes, roomId) => {

                const centerDeg = 185 + 40 * (roomId + 1);
                const chatroomRadius = 6.2;
                const center = degToPosition(centerDeg, chatroomRadius);
                result.roomCenters.push(center);

                nodes.forEach(n => {
                    n.x = n.x * rate;
                    n.y = n.y * rate;
                    n.z = (Math.random() - Math.random()) * 2;
                });

                addAdditionalNodes(nodes, centerDeg, chatroomRadius, dateDiff * 2);
                result.chatRoomsNodes = result.chatRoomsNodes.concat(nodes);

                const lines = getLineToEachOther(nodes, 0.1);
                result.linesForChatRooms = result.linesForChatRooms.concat(lines.slice(0, 160));
            });

            res.json(result);
        });
    });
};

function forEachRoom(data, func) {
    for (let i = 0; i < 9; i++) {
        func(data[`chatroom${i}`], i);
    }
};

function degToPosition(deg, radius, randomZ) {
    const degToRad = 0.0174533;
    const rad = deg * degToRad;
    const x = radius * Math.sin(rad);
    const y = radius * Math.cos(rad);
    const position = { x, y, z: 0 };
    if (randomZ) {
        position.z = (Math.random() - Math.random()) * 1.3;
        position.z = position.z < 0 ? position.z - 0.6 : position.z + 0.6;
    }
    return position;
};



function getRandomNumberInRange(min, max, digits) {
    const rate = Math.pow(10, digits);
    return getRandomIntInRange(min * rate, max * rate) / rate;
};

function getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function addAdditionalNodes(data, centerDeg, chatroomRadius, count) {
    for (let c = 0; c < count; c++) {
        const degRange = 15;
        const deg = getRandomNumberInRange(centerDeg - degRange, centerDeg + degRange, 2);
        const radius = getRandomNumberInRange(chatroomRadius - 0.5, chatroomRadius + 0.5, 2);
        const position = degToPosition(deg, radius, true);
        position['isAdditional'] = true;
        data.push(position);
    }
};

function getDistance(v1, v2) {
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

function getLineToEachOther(points, filterLength) {
    const lines = [];
    points.forEach((from, iOfFrom) => {
        points.forEach((to, iOfTo) => {
            if (iOfFrom < iOfTo) {
                const distance = getDistance(from, to);
                if (filterLength && filterLength > distance)
                    return;

                const key = `${iOfFrom}-${iOfTo}`;
                lines.push({
                    key: key,
                    from: from,
                    to: to,
                    distance: distance
                });
            }
        });
    });
    return lines.sort((a, b) => a.distance - b.distance);
};

function sentToChatbots(text, rid, userName) {

    repo.Message.create({
        time: new Date(),
        message: text,
        name: userName,
        chatroomId: rid,
    }).catch(err => errorHandler(err));
    createParticle(rid, 'white', 0);

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
        ]).catch(err => errorHandler(err));
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

    const reduceTime = 15 * 60 * 1000;
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
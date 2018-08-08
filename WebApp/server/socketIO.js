'use strict';

const logger = require('./logger');
const common = require('./commonNodeJSUtility.js');

const socketIO = {
    backgroundParticles: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
    io: null,

    createSocketIO: (server) => {
        const io = socketIO.io = require('socket.io')(server);
        io.on('connection', socket => {
            const push = setInterval(() => {
                socket.emit('updateBackgroundParticles', socketIO.backgroundParticles)
            }, 100);

            let userInfo = null;

            socket.on('updateUserInfo', info => {
                try { JSON.stringify(info); }
                catch (err) {
                    logger.error('user info parsing error');
                    throw err;
                }
                userInfo = info;
            });

            socket.on('disconnect', () => {
                clearInterval(push);
                if (userInfo) logger.info('sign out: ' + common.deserializeSafely(userInfo));
            });
        });
    }
};


module.exports = socketIO;
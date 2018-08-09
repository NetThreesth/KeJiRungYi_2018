'use strict';

const logger = require('./logger');
const common = require('./commonNodeJSUtility.js');
const repo = require('./repository.js');

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
                if (!userInfo) return;

                logger.info('sign out: ' + common.deserializeSafely(userInfo));
                const signInTime = new Date(userInfo.signInTime);
                repo.UserLog.create({
                    userName: userInfo.userName,
                    chatRoomIndex: userInfo.chatRoomIndex,
                    touchEventCount: userInfo.touchEventCount,
                    signInTime: signInTime,
                    stayTime: Date.now() - signInTime.getTime()
                });

                userInfo = null;
            });
        });
    }
};


module.exports = socketIO;
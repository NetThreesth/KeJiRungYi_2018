'use strict';

const logger = require('./logger');
const common = require('./commonNodeJSUtility.js');
const repo = require('./repository.js');


class Particles {
    constructor() {
        this.white = 0;
        this.yellow = 0;
        this.pink = 0;
    };
};

const socketIO = {
    backgroundParticles: function () {
        return Array.from(Array(9)).map(() => new Particles());
    }(),

    io: null,

    initSocketIO: (server) => {
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
                const stayTime = Date.now() - signInTime.getTime();
                repo.UserLog.create({
                    userName: userInfo.userName,
                    chatRoomIndex: userInfo.chatRoomIndex,
                    touchEventCount: userInfo.touchEventCount,
                    signInTime: signInTime,
                    stayTime: stayTime
                });

                const axios = require('axios');
                axios.post('http://35.236.167.99:5000/3sth/api/v1.0/userdata/', {
                    "touch": userInfo.touchEventCount,
                    "time": stayTime / 1000 / 60, //單位是分鐘
                    "rid": userInfo.chatRoomIndex // 0-8
                }).then(response => {

                    const baseline = {
                        rid: userInfo.chatRoomIndex,
                        led: response.data.baseline_led,
                        pump: response.data.baseline_pump
                    };
                    logger.info(baseline);
                    userInfo = null;
                });

            });
        });
    }
};


module.exports = socketIO;
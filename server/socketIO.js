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
                if (!userInfo || !userInfo.userName) return;

                logger.info('sign out: ' + common.deserializeSafely(userInfo));
                const signInTime = new Date(userInfo.signInTime);
                const stayTime = Date.now() - signInTime.getTime();

                repo.UserLog.create({
                    userName: userInfo.userName,
                    chatRoomIndex: userInfo.chatRoomIndex,
                    touchEventCount: userInfo.touchEventCount,
                    signInTime: signInTime,
                    stayTime: stayTime
                })
                    .then(() => {
                        return repo.UserLog.findAll({
                            where: { chatRoomIndex: userInfo.chatRoomIndex }
                        });
                    })
                    .then(instances => {
                        const sum = {
                            touch: 0,
                            time: 0,
                            rid: userInfo.chatRoomIndex
                        };
                        instances.forEach(i => {
                            sum.touch += i.touchEventCount;
                            sum.time += i.stayTime;
                        });
                        sum.time = sum.time / 1000 / 60;
                        return require('axios').post(
                            'http://35.236.167.99:5000/3sth/api/v1.0/userdata/',
                            sum
                        );
                    })
                    .then(response => {
                        const baseline = {
                            rid: userInfo.chatRoomIndex,
                            led: response.data.baseline_led,
                            pump: response.data.baseline_pump,
                            time: new Date()
                        };
                        logger.info(`baseline: ${common.deserializeSafely(baseline)}`);
                        repo.Baseline.create(baseline).catch(err => logger.error(err));
                        userInfo = null;
                    })
                    .catch(err => logger.error(err));;


            });
        });
    }
};


module.exports = socketIO;
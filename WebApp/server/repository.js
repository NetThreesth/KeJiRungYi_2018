'use strict';

const logger = require('./logger');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:threesththreesththreesth@35.236.188.139:3306/threesth');
sequelize.authenticate()
    .then(() => logger.debug('Connection has been established successfully.'))
    .catch(err => logger.error('Unable to connect to the database:', err));

const repo = module.exports = {};

repo.Message = sequelize.define(
    'message',
    {
        id: { type: Sequelize.INTEGER, primaryKey: true },
        time: { type: Sequelize.TIME },
        message: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING },
        chatroomId: { type: Sequelize.STRING },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'messagelog',
    }
);

repo.UserLog = sequelize.define(
    'userLog',
    {
        id: { type: Sequelize.INTEGER, primaryKey: true },
        userName: { type: Sequelize.STRING },
        chatRoomIndex: { type: Sequelize.STRING },
        touchEventCount: { type: Sequelize.INTEGER },
        signInTime: { type: Sequelize.TIME },
        stayTime: { type: Sequelize.INTEGER },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'userlog',
    }
); 
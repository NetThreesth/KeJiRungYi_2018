'use strict';

const logger = require('./logger');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:threesththreesththreesth@35.236.188.139:3306/threesth');
sequelize.authenticate()
    .then(() => logger.debug('Connection has been established successfully.'))
    .catch(err => logger.error('Unable to connect to the database:', err));

const repo = module.exports = {};

repo.Op = Sequelize.Op;

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


repo.UploadedImage = sequelize.define(
    'message',
    {
        id: { type: Sequelize.INTEGER, primaryKey: true },
        time: { type: Sequelize.TIME },
        base64image: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING },
        chatroomId: { type: Sequelize.STRING },
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'uploadedimage',
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

repo.MetaPattern = sequelize.define(
    'metaPattern',
    {
        id: { type: Sequelize.INTEGER, primaryKey: true },
        pattern: { type: Sequelize.STRING }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'metapattern',
    }
);

repo.Baseline = sequelize.define(
    'baseline',
    {
        id: { type: Sequelize.INTEGER, primaryKey: true },
        rid: { type: Sequelize.INTEGER },
        led: { type: Sequelize.INTEGER },
        pump: { type: Sequelize.INTEGER },
        time: { type: Sequelize.TIME }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'baseline',
    }
);


repo.getAlgaeImages = () => {
    return repo.UploadedImage.findAll(
        {
            limit: 10,
            where: { name: 'algae' },
            attributes: [
                'chatroomId', 'time', 'base64image'
            ],
            order: [['time', 'DESC']]
        }
    );
};
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:threesththreesththreesth@35.236.188.139:3306/threesth');
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');

    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const repo = module.exports = {};

repo.Message = sequelize.define(
    'message', {
        id: { type: Sequelize.STRING, primaryKey: true },
        time: { type: Sequelize.STRING },
        message: { type: Sequelize.STRING },
        name: { type: Sequelize.STRING }, 
        chatroomId : { type: Sequelize.STRING },
    }, {
        timestamps: false, freezeTableName: true,
        freezeTableName: true,
        tableName: 'messagelog',
    }
);
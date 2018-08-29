const Sequelize = require('sequelize');
const { UserLog: repo } = require('../../server/repository.js');

const prefix = 'unit-test';
const searchPattern = {
    where: {
        userName: {
            [Sequelize.Op.like]: prefix + '%'
        }
    }
};
/* 
        id: { type: Sequelize.INTEGER, primaryKey: true },
        userName: { type: Sequelize.STRING },
        chatRoomIndex: { type: Sequelize.STRING },
        touchEventCount: { type: Sequelize.INTEGER },
        signInTime: { type: Sequelize.TIME },
        stayTime: { type: Sequelize.INTEGER },
*/

repo.create({
    userName: `${prefix}-user`,
    chatRoomIndex: '8',
    touchEventCount: 888,
    signInTime: new Date(),
    stayTime: 555555,
}).then(instance => {
    console.log(`after create:`);
    console.log(instance.get({ plain: true }));
    return repo.findAll(searchPattern);
}).then(instances => {
    console.log(`before destroy len: ${instances.length}`);
    return repo.destroy(searchPattern);
}).then(() => {
    return repo.findAll(searchPattern);
}).then(instances => {
    console.log(`after destroy len: ${instances.length}`);
    console.log(JSON.stringify(instances));
});
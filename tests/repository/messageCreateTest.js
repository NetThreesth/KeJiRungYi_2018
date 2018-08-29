
const Sequelize = require('sequelize');
const { Message: repo } = require('../../server/repository.js');


const prefix = 'unit-test';
const searchPattern = {
    where: {
        name: {
            [Sequelize.Op.like]: prefix + '%'
        }
    }
};

// id: { type: Sequelize.INTEGER, primaryKey: true },
// time: { type: Sequelize.TIME },
// message: { type: Sequelize.STRING },
// name: { type: Sequelize.STRING },
// chatroomId: { type: Sequelize.STRING },
repo.create({
    time: new Date(),
    message: 'message-test',
    name: prefix + '-name',
    chatroomId: 'chatroomId-test'
}).then(instance => {
    console.log(`after create:`);
    console.log(instance.get({ plain: true }));

    return repo.findAll(searchPattern);
}).then(instances => {
    console.log(`len: ${instances.length}`);
    console.log(JSON.stringify(instances));

    console.log(`before destroy:`);
    return repo.destroy(searchPattern);
}).then(() => {
    return repo.findAll(searchPattern);
}).then(messages => {
    console.log(`after destroy:`);
    console.log(`len: ${messages.length}`);
    console.log(JSON.stringify(messages));
});
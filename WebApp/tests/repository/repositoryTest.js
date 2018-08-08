
const Sequelize = require('sequelize');
const repo = require('../../server/repository.js');


repo.Message.findAll().then(messages => {
    console.log(`before create:`);
    console.log(`len: ${messages.length}`);
    console.log(JSON.stringify(messages));

    return repo.Message.create({
        // id: { type: Sequelize.INTEGER, primaryKey: true },
        // time: { type: Sequelize.TIME },
        time: new Date(),
        // message: { type: Sequelize.STRING },
        message: 'message-test',
        // name: { type: Sequelize.STRING },
        name: 'unit-test-name',
        // chatroomId: { type: Sequelize.STRING },
        chatroomId: 'chatroomId-test',
    });
}).then(message => {
    console.log(`after create:`);
    console.log(message.get({
        plain: true
    }));

    return repo.Message.findAll();
}).then(messages => {
    console.log(`before destroy:`);
    console.log(`len: ${messages.length}`);
    console.log(JSON.stringify(messages));

    return repo.Message.destroy({
        where: {
            name: {
                [Sequelize.Op.like]: 'unit-test%'
            }
        }
    });
}).then(() => {
    return repo.Message.findAll();
}).then(messages => {
    console.log(`after destroy:`);
    console.log(`len: ${messages.length}`);
    console.log(JSON.stringify(messages));
});
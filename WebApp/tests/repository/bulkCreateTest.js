const Sequelize = require('sequelize');
const repo = require('../../server/repository.js');

const now = new Date();
const testName = 'unit-test-name';
const testMsg = 'bulk create test';
const rid = 8;

repo.Message.findAll().then(messages => {

    console.log(`before bulkCreate:`);
    console.log(`len: ${messages.length}`);

    return repo.Message.bulkCreate([
        {
            time: now,
            message: testMsg,
            name: testName + 1,
            chatroomId: rid,
        }, {
            time: now,
            message: testMsg,
            name: testName + 2,
            chatroomId: rid,
        }, {
            time: now,
            message: testMsg,
            name: testName + 3,
            chatroomId: rid,
        }
    ]);
}).then(() => {
    console.log('bulkCreate done');
    return repo.Message.findAll()
}).then(messages => {

    console.log(`after bulkCreate:`);
    console.log(`len: ${messages.length}`)

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
});
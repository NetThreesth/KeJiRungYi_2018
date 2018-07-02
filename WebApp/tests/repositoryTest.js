const repo = require('../server/repository.js');


repo.Message.findAll().then(messages => {
    console.log(JSON.stringify(messages));
})
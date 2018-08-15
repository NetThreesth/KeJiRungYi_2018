const { MetaPattern: repo } = require('../../server/repository.js');


repo.findOne({
    order: [ [ 'id', 'DESC' ]],
}).then(instance => {
    console.log(`after query:`);
    console.log(instance.get({ plain: true }));
});
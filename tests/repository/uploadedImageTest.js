const Sequelize = require('sequelize');
const { UploadedImage: repo, getAlgaeImages } = require('../../server/repository.js');

repo.findOne({
    where: { chatroomId: 0 },
    order: [['time', 'DESC']]
}).then(image => {
    console.log(image.get({ plain: true }));

}).catch(err => errorHandler(err, next));


getAlgaeImages().then(result => {
    console.log(result);
});
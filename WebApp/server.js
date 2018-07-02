'use strict';

// [START app]
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const app = express();

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.static(__dirname));
const setting = { limit: '50mb' };
app.use(bodyParser.urlencoded(Object.assign({ extended: false }, setting)));
app.use(bodyParser.json(setting));
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

app.route('/apis/uploadImage').post((req, res, next) => {

  console.log(`${new Date()} uploadImage fired`);
  console.log(req.body);
  const content = req.body;
  if (!content) {
    res.status(404).send('image not exist');
    return;
  }

  //  Google Cloud Vision Api
  const vision = require('@google-cloud/vision');
  const client = new vision.ImageAnnotatorClient();
  const query = {
    image: {
      content: content.base64Image,
    },
    features: [
      {
        "type": "LABEL_DETECTION"
      }
    ]
  };
  client.annotateImage(query)
    .then(results => {
      const labels = results[0].labelAnnotations;
      console.log('Labels:');
      labels.forEach(label => console.log(label));
      res.json(labels);
      res.end();
    })
    .catch(err => {
      console.error(err);
      next(err);
    });

});

app.route('/apis/getPoints').get((req, res) => {

  res.writeHead(200, {
    'Content-Type': 'text/json',
    'Access-Control-Allow-Origin': '*',
    'X-Powered-By': 'nodejs'
  });

  const fs = require('fs');
  fs.readFile('MockPoints.json', (err, content) => {
    res.write(content);
    res.end();
  });
});
// [END app]




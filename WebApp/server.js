'use strict';

// [START app]
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./server/logger');

const app = express();

app.use(morgan('combined', { stream: logger.accessLogStream }));
app.use(express.static(__dirname));
const setting = { limit: '50mb' };
app.use(bodyParser.urlencoded(Object.assign({ extended: false }, setting)));
app.use(bodyParser.json(setting));
app.use((err, req, res, next) => {
  logger.info(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`App listening on port ${PORT}`);
  logger.info('Press Ctrl+C to quit.');
});

app.route('/apis/uploadImage').post((req, res, next) => {

  logger.info(`${new Date()} uploadImage fired`);
  const content = req.body;
  if (!content) {
    logger.error(`image not exist`);
    res.status(400).send('image not exist');
    return;
  }

  //  Google Cloud Vision Api
  const vision = require('@google-cloud/vision');
  const client = new vision.ImageAnnotatorClient();
  const query = {
    image: {
      content: content.base64Image.split(',')[1]
    },
    features: [
      {
        "type": "LABEL_DETECTION",
        "maxResults": 6
      }
    ]
  };
  client.annotateImage(query)
    .then(results => {
      const labels = results[0].labelAnnotations;
      logger.info('Labels:');
      labels.forEach(label => logger.info(label));
      res.json(labels);
      res.end();
    })
    .catch(err => {
      logger.error(err.message);
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




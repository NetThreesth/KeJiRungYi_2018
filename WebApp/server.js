'use strict';

// [Setup]
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
  res.json({
    message: err.message,
    error: err
  });
  res.end();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`App listening on port ${PORT}`);
  logger.info('Press Ctrl+C to quit.');
});
// [END Setup]



// [APIs]
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
      logger.error(err);
      next(err);
    });
});



app.route('/apis/uploadText').post((req, res, next) => {
  const message = req.body.text;
  const response = message.split('').join('...');

  const axios = require('axios');
  axios.post('http://35.236.167.99:5000/3sth/api/v1.0/chatbots/', {
    msg: message,
    rid: 1
  })
    .then(res => {
      res.json(res);
      res.end();
    })
    .catch(err => {
      logger.error(err.message);
      logger.error(err);
      res.json({
        "active": "chatbots",
        "roomId": 1,
        "chatbotResponse": response,
        "algaeResponse": 'al...gae......',
        "inputMsg": message
      });
      res.end();
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
// [END APIs]




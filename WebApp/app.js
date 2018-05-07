'use strict';

// [START app]
const express = require('express');

const app = express();

app.use(express.static(__dirname));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

app.route('/apis/uploadImage')
  .get(function (req, res, next) {
    //  Google Cloud Vision Api
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();
    client.labelDetection(`https://raw.githubusercontent.com/googleapis/nodejs-vision/master/samples/resources/faulkner.jpg`)
      .then(results => {
        const labels = results[0].labelAnnotations;
        console.log('Labels:');
        labels.forEach(label => console.log(label));
        res.json(labels);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });

  });

app.route('/apis/getPoints')
  .get(function (req, res, next) {
    res.writeHead(200, {
      'Content-Type': 'text/json',
      'Access-Control-Allow-Origin': '*',
      'X-Powered-By': 'nodejs'
    });

    var fs = require('fs');
    fs.readFile('MockPoints.json', function (err, content) {
      res.write(content);
      res.end();
    });
  });
// [END app]




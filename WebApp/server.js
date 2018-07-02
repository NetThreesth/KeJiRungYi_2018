'use strict';

// [START app]
const express = require('express');
var bodyParser = require('body-parser')

const app = express();

app.use(express.static(__dirname));
const setting = { limit: '50mb' };
app.use(bodyParser.urlencoded(Object.assign({ extended: false }, setting)));
app.use(bodyParser.json(setting));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

app.route('/apis/uploadImage').post((req, res) => {

  console.log(`${new Date()} uploadImage fired`);
  console.log(req.body);
  const content = req.body;
  if (!content) {
    res.end();
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
      console.error('ERROR:', err);
    });

});

app.route('/apis/getPoints').get((req, res) => {

  res.writeHead(200, {
    'Content-Type': 'text/json',
    'Access-Control-Allow-Origin': '*',
    'X-Powered-By': 'nodejs'
  });

  var fs = require('fs');
  fs.readFile('MockPoints.json', (err, content) => {
    res.write(content);
    res.end();
  });
});
// [END app]




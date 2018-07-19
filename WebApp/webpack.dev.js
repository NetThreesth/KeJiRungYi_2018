const merge = require('webpack-merge');
const setting = require('./webpack.prod.js');



module.exports = merge(setting, {
  output: {
    filename: 'bundle.[name].js',
  },
  watch: true,
  watchOptions: {
    ignored:  ['app', 'node_modules']
  }
});
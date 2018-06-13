const path = require('path');

module.exports = {
  entry: {
    'main': './src/main.tsx',
    'UpdateTextNodeWorker': './src/UpdateTextNodeWorker.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "source-map",
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  externals: {
    "jquery": "$",
    "babylonjs": "BABYLON",
    "react": "React",
    "react-dom": "ReactDOM"
  }
};
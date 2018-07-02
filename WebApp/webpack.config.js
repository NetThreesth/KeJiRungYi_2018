const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'main': './app_src/main.tsx',
    'UpdateTextNodeWorker': './app_src/UpdateTextNodeWorker.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'app')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: "source-map",
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
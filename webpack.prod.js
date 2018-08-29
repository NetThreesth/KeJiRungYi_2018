const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: {
    'main': './app_src/main.tsx',
    'CreateLinesWorker': './app_src/CreateLinesWorker.ts'
  },
  output: {
    filename: 'bundle.[name].[chunkhash].js',
    path: path.resolve(__dirname, 'app')
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app_src/index.html',
      inject: false
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app_src/index.html',
      inject: false
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') })
  ],
  externals: {
    "jquery": "$",
    "babylonjs": "BABYLON",
    "react": "React",
    "react-dom": "ReactDOM"
  }
};
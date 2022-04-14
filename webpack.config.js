const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: "node",
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./proxy.ts",
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "proxy.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
};

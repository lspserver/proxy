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
    path: path.resolve(__dirname, 'build'),
    filename: "[name]-bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
  externals: [/node_modules/, 'bufferutil', 'utf-8-validate'],
};

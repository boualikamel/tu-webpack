const webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: { index: "./src/main.js" },
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "./dist"),
  },
};

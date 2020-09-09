const webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
const ArcGISPlugin = require("@arcgis/webpack-plugin");

module.exports = {
  entry: { index: "./src/main.js" },
  output: {
    filename: "main.bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images"
            }
          }
        ]
      },
      {
        test: /\.(wsv|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "build/[name].[ext]"
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "TU WEBPACK",
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["index"],
    }),
    new ArcGISPlugin({
      useDefaultAssetLoaders: false
    })
  ],
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".scss"]
  },
  node: {
    process: false,
    global: false,
    fs: "empty"
  },
  externals: {
    moment: "moment"
  },
};

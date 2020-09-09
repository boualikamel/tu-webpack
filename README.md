# tu-webpack
a tutorial for webpack to GIS team

## Steps to reproduce

### Initialize the project 
### Creating webpack config file webpack.config.js
The path library is for path methods
and we require the webpack library
```js
const webpack = require( 'webpack' );
var path = require('path');

module.exports = {  
};
```
### Creating source folder and main files index.html main.js main.scss
### installing webpack into our project
```shell
npm i -d webpack webpack-cli webpack-dev-server
```
the library webpack is the source library for webpack
webpack cli is the cli -for the commande line- 
webapack-dev-server is for configuring dev server in our webpack configuration
### first configuration 
 ```js
module.exports = {
  entry: { index: "./src/main.js" },
  output: {
    filename: "main.bundle.js",
    path:  "./dist",
  },
};
```
### including the commands
the first command we should introduce is for the development server
```js
"start":"webpack-dev-server"
```
the second command we should introduce is for building our entry file
```js
"build":"webpack"
```
Try it
### Setting the template index.html as home page 
For this we need a plugin to install 
```shell
npm install --save-dev html-webpack-plugin
```
then we import the plugin in our configuration 
```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
```
then we add our configuration into plugin option
```js
 new HtmlWebpackPlugin({
      title: "TU WEBPACK",
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["index"]
    })
```
we try and we can see that the our production file main.bundle.js is added as script

### Setting our sass config !
for this we need a `sass-loader` that can load our sass file into our js file and webpack will automatically add it as link balise into our distribution html file index.html and we need also to install `sass` and css-loader and style-loader because of sass will be compiling into css and we need also a css loader .. and style loader is for creating a style balise into our html
```shell
npm install -d sass sass-loader css-loader style-loader 
```

```js
 module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
         use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
       {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
    ],
  },
```

### Setting our babel config !
we install the essential package for babel to work the core and the preset env 
```shell
npm install -D babel-loader @babel/core @babel/preset-env
```

and than we add the loader config into our rule option configuration

```js
 {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
```

### installing our first external dependency sweetalert!
```shell
npm install sweetalert --save
```

adding some code 
```js
import swal from 'sweetalert';
swal("Hello world!");
```

### Adding some code 
we will add header and side bar 


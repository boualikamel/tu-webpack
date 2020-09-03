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
 entry: { index: "./src/main.js" },
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "./dist"),
  },
```

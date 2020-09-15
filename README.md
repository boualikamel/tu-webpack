# tu-webpack

a tutorial for webpack to GIS team

## Steps to reproduce

### Initialize the project

```shell
npm init
```

### Creating webpack config file webpack.config.js

The path library is for path methods
and we require the webpack library

```js
const webpack = require("webpack");
var path = require("path");

module.exports = {};
```

### Creating source folder and main files index.html

```html<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    helllo
  </body>
</html>
```

### Creating source folder and main files main.js

```js
console.log("hello from main js");
```

### Creating source folder and main files main.scss

```scss
html {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  background-color: darkcyan;
}
```

### installing webpack into our project

```shell
npm i -d webpack webpack-cli webpack-dev-server
```

the library webpack is the source library for webpack
webpack cli is the cli -for the commande line-
webapack-dev-server is for configuring dev server in our webpack configuration

### first configuration in webpack.config.js

```js
module.exports = {
  entry: { index: "./src/main.js" },
  output: {
    filename: "main.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

### including the commands

the first command we should introduce is for the development server in scripts in package.json file

```js
"start":"webpack-dev-server"
```

the second command we should introduce is for building our entry file

```js
"build":"webpack"
```

Try it

```shell
npm run build
```

### Setting the template index.html as home page

For this we need a plugin to install

```shell
npm install --save-dev html-webpack-plugin
```

then we import the plugin in our configuration

```js
var HtmlWebpackPlugin = require("html-webpack-plugin");
```

then we add our configuration into plugin option

```js
    plugins: [
        new HtmlWebpackPlugin({
            title: "TU WEBPACK",
            filename: "index.html",
            template: "./src/index.html",
            chunks: ["index"],
        }),
    ],
```

we try and we can see that the our production file main.bundle.js is added as script

### Setting our sass config !

for this we need a `sass-loader` that can load our sass file into our js file and webpack will automatically add it as link balise into our distribution html file index.html and we need also to install `sass` and css-loader and style-loader because of sass will be compiling into css and we need also a css loader .. and style loader is for creating a style balise into our html

```shell
npm install -d sass sass-loader css-loader style-loader
```

add this to webpackConfig.js

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

    ],
  },
```

add this to main.js

```js
import "./main.scss";
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

add this to main.js

```js
let es = "hello";
```

### installing our first external dependency sweetalert!

```shell
npm install sweetalert --save
```

adding some code to main js

```js
import swal from "sweetalert";
swal("Hello world!");
```

### Adding some code

we will add header (js/html/sass)
header.html

```html
<header>
  <span>HELLO FROM HEADER TEMPLATE</span>
</header>
```

header.sass

```scss
header {
  width: 100%;
  background-color: red;
  height: 50px;
}
```

header.js

```js
import template from "./header.html";
export class Header {
  constructor() {
    console.log(`This is header constructor`);
    this.setTemplate();
  }
  setTemplate() {
    document.getElementById("body").insertAdjacentHTML("afterbegin", template);
  }
}
```

and we will import header and instanciate it in main.js

```js
import { Header } from "./layouts/header/header";
let header = new Header();
```

we can notice the error indicate there is a loader to add for html than we install this loader

```shell
npm install --save-dev html-loader
```

and we will add the rule of this loader into our config
add to webpackConfig.js

`````js
     {
       test: /\.html$/i,
       loader: "html-loader",
     },
```
add this to index.html
````html
<body id='body'>
`````

add this to main.scss

```scss
@import "./layouts/header/header.scss";
```

and we will after that and add an other layout, it's about a content of our page

create content folder and the content.html

```html
<main>hello from content</main>
```

create the content.scss

```scss
main {
  height: calc(100% - 50px);
  width: 100%;
  background-color: rgb(115, 126, 123);
}
```

create the content.js

```js
import template from "./content.html";
export class Content {
  constructor() {
    this.setTemplate();
  }
  setTemplate() {
    document.getElementById("body").insertAdjacentHTML("afterbegin", template);
  }
}
```

add this to main.scss

```scss
@import "./layouts/content/content.scss";
```

add this to mains.js

```js
import { Content } from "./layouts/content/content";
let content = new Content();
```

### Adding Arcgis PLUGIN :o @arcgis/webpack-plugin

first step is for sure installing the plugin !

```shell
npm install --save-dev @arcgis/webpack-plugin
```

the second is to create a file for the worker of arcgis and we will nominate it arcgisConf (see the documentation of the plugin )
we will instanciante the plugin in our webpack configuration

```js
// webpack.config.js
const ArcGISPlugin = require("@arcgis/webpack-plugin");

// add it to config
module.exports = {
  ...
  plugins: [new ArcGISPlugin({
    useDefaultAssetLoaders: false
  })]
  ...
}
```

and we will add a file loader for charging the fonts, and the url-loader for charging the images because the plugin uses fonts and images

```shell
npm i -d file-loader url-loader
```

and we will add the config of those loaders

```js
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
```

and adding this config .. for disbaling some arcgis web assembly problem with webpack

```js
  resolve: {
    modules: [path.resolve(__dirname, "/src"), "node_modules/"],
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
```

update content.js

```js
import template from "./content.html";
import Map from "esri/Map";
import MapView from "esri/views/MapView";

export class Content {
  constructor() {
    this.setTemplate();
    this.initMap();
  }
  setTemplate() {
    document.getElementById("body").insertAdjacentHTML("afterbegin", template);
  }
  initMap() {
    const map = new Map({
      basemap: "topo-vector",
    });

    const view = new MapView({
      container: "mapView", // Reference to the DOM node that will contain the view
      map: map, // References the map object created in step 3
    });
  }
}
```

add this to content.html

```html
<main id="mapView"></main>
```

add this to main.scss

```scss
@import "~arcgis-js-api/themes/dark-blue/main.css";
```

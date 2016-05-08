var webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "./dateslider/static/index.js",
    libraryTarget: "umd",
    umdNamedDefine: "widget-dateslider"
  },
  externals: {
    "jquery": "jquery",
    "underscore": "underscore",
    "widgets": "nbextensions/widgets/widgets/js/widget"
  },
  resolve: {
    alias: {
      "requirejs": "requirejs/require"
    }
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /.less$/, loader: "style!css!less"}
    ]
  }
}

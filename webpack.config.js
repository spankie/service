var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
      home: "./public/home/index.js"
  },
  output: {
    filename: "js/[name]-bundle.js",
    path: __dirname + "/public/assets"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new ExtractTextPlugin("application.css"),
    new CopyWebpackPlugin([{
      from: "./assets",
      to: ""
    }], {
      ignore: [
        "css/*",
        "js/*",
      ]
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ],
  module: {
    // loaders: [{
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     loader: 'babel-loader'
    // }],
    rules: [{
      test: /\.jsx?$/,
      loader: "babel-loader",
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use:
        [{
          loader: "css-loader",
          options: { sourceMap: true }
      	},
        {
          loader: "sass-loader",
          options: { sourceMap: true }
        }]
      })
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: "url-loader?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: "file-loader"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: "url-loader?limit=10000&mimetype=image/svg+xml"
    }, {
      test: require.resolve('jquery'),
      use: 'expose-loader?jQuery!expose-loader?$'
    }]
  }
};

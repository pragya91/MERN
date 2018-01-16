const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry : {
    app: './src/jsx/App.jsx',
    vendor: ['react','react-dom','react-router-dom']
  },
  output: {
    path: __dirname + '/static',
    filename: 'app.bundle.js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name:'vendor',filename:'vendor.bundle.js'}),
    new ExtractTextPlugin("styles.css")
  ],
  devServer:{
    historyApiFallback :true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015']
        }
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(png|jpeg|jpg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'imgs/'
          }
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  }
};

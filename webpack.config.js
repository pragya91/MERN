const webpack = require('webpack');
module.exports = {
  entry : {
    app: './src/App.jsx',
    vendor: ['react','react-dom','react-router-dom']
  },
  output: {
    path: __dirname + '/static',
    filename: 'app.bundle.js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name:'vendor',filename:'vendor.bundle.js'})
  ],
  devServer:{
    historyApiFallback :true
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015']
        }
      }
    ]
  }
};

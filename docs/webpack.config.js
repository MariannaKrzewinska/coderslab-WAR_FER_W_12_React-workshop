//Konfiguracja Webpack
const webpack = require('webpack');

module.exports = {
  entry: [
    'whatwg-fetch',
    'react-hot-loader/patch',
    './js/zadanie01.jsx'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    inline: true,
    contentBase: './',
    hot: true
  }
};

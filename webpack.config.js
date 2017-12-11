const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './app/js/index.js'],
  output: {
    path: path.join(__dirname, 'app/dist'),
    filename: 'bundle.js',
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [{
      test: /.jsx?$/,
      exclude: /\/node_modules\//,
      loader: 'babel-loader',
    }, {
      test: /.less$/,
      loaders: ['style-loader', 'css-loader', 'less-loader'],
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader'],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less'],
  },
};

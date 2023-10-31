const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/index.js',

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Development',
      template: './public/index.html',
    }),
  ],
};

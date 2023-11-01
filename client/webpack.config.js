const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const _resolve = path.resolve;

const mode = 'development';
const entry = './index.js';
const output = {
  path: _resolve(__dirname, 'public'),
  filename: 'main.js',
};
const plugins = [
  new HTMLWebpackPlugin({
    title: 'Development',
    template: './public/index.html',
  }),
];

const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: 'babel-loader',
  },
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader', 'postcss-loader'],
  },
];

const target = 'web';

const devServer = {
  host: 'localhost',
  port: '8080',
  open: true,
  hot: true,
  liveReload: true,
  static: {
    publicPath: '/public',
    directory: _resolve(__dirname, 'public'),
  },

  proxy: {
    '/': 'http://localhost:3000',
  },
};

const resolve = {
  extensions: ['.js', '.jsx', '.json'],
};

module.exports = {
  mode,
  entry,
  output,
  plugins,
  module: {
    rules,
  },
  target,
  devServer,
  resolve,
};
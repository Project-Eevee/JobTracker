import { resolve as _resolve } from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';

export const mode = 'development';
export const entry = './client/index.js';
export const output = {
  path: _resolve(__dirname, 'public'),
  filename: 'main.js',
};
export const plugins = [
  new HTMLWebpackPlugin({
    title: 'Development',
    template: './public/index.html',
  }),
];
export const module = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    },
  ],
};

export const target = 'web';
export const devServer = {
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
export const resolve = {
  extensions: ['.js', '.jsx', '.json'],
};

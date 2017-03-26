import path from 'path';

module.exports = {
  entry: './src/client/root.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src/server/assets/dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: [/node_modules/], use: 'babel-loader' },
    ],
  },
};

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const { NODE_ENV = 'production' } = process.env;

module.exports = {
  entry: './src/app.ts',
  devtool: 'inline-source-map',
  mode: NODE_ENV,
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.json'],
    plugins: [new TsconfigPathsPlugin()]
  },
  plugins: [new CheckerPlugin()],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: [nodeExternals()]
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appRoot = path.join(__dirname, '..');

module.exports = {
  devtool: 'inline-source-map',
  entry: path.join(appRoot, 'src', 'index.tsx'),
  output: {
    path: path.join(appRoot, 'build'),
    filename: 'index.bundle.js',
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    // alias: {
    //   lhComponent: path.resolve(__dirname, '../es6/component/index'),
    //   lhConstants: path.resolve(__dirname, '../es6/bundle/application/constants'),
    //   lhUtil: path.resolve(__dirname, '../es6/util/index'),
    // },
    modules: ['node_modules'],
  },
  devServer: { static: { directory: path.join(appRoot, 'src') } },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // this object is equivalent to the babel.config.json file
            presets: [
              '@babel/preset-env',
              [
                '@babel/preset-react',
                {
                  // JSX transform
                  runtime: 'automatic',
                },
              ],
            ],
            comments: false,
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(appRoot, 'public', 'index.html'),
    }),
  ],
};

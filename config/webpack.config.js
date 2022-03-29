const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const DEVELOPMENT = 'development';

const appRoot = path.join(__dirname, '..');
const args = process.argv;

const mode =
  args.find((arg, index) => {
    if (arg === '--mode') {
      return args[index + 1];
    }
  }) || DEVELOPMENT;
const devtool = mode === DEVELOPMENT ? 'inline-source-map' : false;

module.exports = {
  devtool,
  entry: path.join(appRoot, 'src', 'index.tsx'),
  output: {
    path: path.join(appRoot, 'build'),
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  mode,
  resolve: {
    // alias: {
    //   lhComponent: path.resolve(__dirname, '../es6/component/index'),
    //   lhConstants: path.resolve(__dirname, '../es6/bundle/application/constants'),
    //   lhUtil: path.resolve(__dirname, '../es6/util/index'),
    // },
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: path.join(appRoot, 'src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: path.join(appRoot, 'src'),
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
    new CleanWebpackPlugin(),
  ],
};

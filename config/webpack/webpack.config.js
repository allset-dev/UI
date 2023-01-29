/* eslint-disable @typescript-eslint/no-var-requires, no-undef */
const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { NODE_ENV, IS_DEV, API_PROXY, PORT } = require('../env-variables');
const { killPort } = require('../kill-port');

const appRoot = path.join(__dirname, '../..');

const Paths = {
  REACT_ENTRY: path.join(appRoot, 'src', 'index.tsx'),
  ROOT_HTML: path.join(appRoot, 'src', 'static', 'index.html'),
  OUTPUT_PATH: path.join(appRoot, 'build'),
  COMPILE_JS_TS_INCLUDE: path.join(appRoot, 'src'),
  PUBLIC_PATH: '/',
};
const EXCLUDE_PATH = /node_modules/;

if (IS_DEV) {
  killPort();
}

module.exports = {
  devtool: IS_DEV ? 'inline-source-map' : false,
  devServer: {
    compress: true,
    port: PORT,
    // Webpack: Any path name will be routed to the root htmll file, and routing will be taken care by React-router
    historyApiFallback: true,
  },
  entry: Paths.REACT_ENTRY,
  output: {
    path: Paths.OUTPUT_PATH,
    filename: '[name].[contenthash].js',
    publicPath: Paths.PUBLIC_PATH,
  },
  mode: NODE_ENV,
  resolve: {
    // alias: {
    //   bundle: path.resolve(__dirname, '../src/bundle'),
    //   asComponents: path.resolve(__dirname, '../src/components/index'),
    //   asUtils: path.resolve(__dirname, '../es6/utils/index'),
    // },
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: Paths.COMPILE_JS_TS_INCLUDE,
        exclude: EXCLUDE_PATH,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: Paths.COMPILE_JS_TS_INCLUDE,
        exclude: EXCLUDE_PATH,
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
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@import "src/styles/global-styles/index.scss";`,
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: Paths.ROOT_HTML,
    }),
    new CleanWebpackPlugin(),
    // NOTE:(Webpack) Making process.env available to application. You can access process.env. in applicaiton.
    new DefinePlugin({
      'process.env': JSON.stringify({
        API_PROXY,
      }),
    }),
  ],
};

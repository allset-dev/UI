/* eslint-disable @typescript-eslint/no-var-requires, no-undef */
const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const appRoot = path.join(__dirname, '..');

const DEVELOPMENT = 'development';
const Paths = {
  REACT_ENTRY: path.join(appRoot, 'src', 'index.tsx'),
  ROOT_HTML: path.join(appRoot, 'src', 'static', 'index.html'),
  OUTPUT_PATH: path.join(appRoot, 'build'),
  COMPILE_JS_TS_INCLUDE: path.join(appRoot, 'src'),
};
const EXCLUDE_PATH = /node_modules/;
const mode = process.env.MODE || DEVELOPMENT;
const port = process.env.PORT;

const devtool = mode === DEVELOPMENT ? 'inline-source-map' : false;

module.exports = {
  devtool,
  devServer: {
    compress: true,
    port,
  },
  entry: Paths.REACT_ENTRY,
  output: {
    path: Paths.OUTPUT_PATH,
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  mode,
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
    // NOTE:(Webpack) Making process.env available to application. You can access process.env.MODE in applicaiton.
    new DefinePlugin({
      'process.env': JSON.stringify({
        MODE: mode,
      }),
    }),
  ],
};

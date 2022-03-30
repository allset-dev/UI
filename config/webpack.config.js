const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const DEVELOPMENT = 'development';
const Paths = {
  REACT_ENTRY: path.join(appRoot, 'src', 'index.tsx'),
  ROOT_HTML: path.join(appRoot, 'src', 'static', 'index.html'),
  OUTPUT_PATH: path.join(appRoot, 'build'),
  COMPILE_JS_TS_INCLUDE: path.join(appRoot, 'src'),
};
const EXCLUDE_PATH = /node_modules/;

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
  entry: Paths.REACT_ENTRY,
  output: {
    path: Paths.OUTPUT_PATH,
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
      template: Paths.ROOT_HTML,
    }),
    new CleanWebpackPlugin(),
  ],
};

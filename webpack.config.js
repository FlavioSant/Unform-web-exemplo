/* eslint-disable */
const webpack = require('webpack');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv-safe');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { required: env } = dotenv.config();

/**
 * @returns {webpack.Configuration}
 */
const createConfig = () => {
  /**
   * @type {webpack.Configuration}
   */
  const config = {
    entry: join(__dirname, 'src', 'index.tsx'),
    output: {
      path: join(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    performance: false,
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new webpack.EnvironmentPlugin(env),
      new HtmlWebpackPlugin({
        template: join(__dirname, 'public', 'index.html'),
        favicon: join(__dirname, 'public', 'favicon.ico'),
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader'],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };

  if (process.env.NODE_ENV === 'development') {
    return {
      ...config,
      devServer: {
        inline: true,
        historyApiFallback: true,
        hot: true,
        open: true,
      },
      devtool: 'eval-source-map',
      module: {
        rules: [
          ...config.module.rules,
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                cacheDirectory: true,
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        browsers: 'last 2 versions, not dead, > 0.25%',
                      },
                    },
                  ],
                  ['@babel/preset-typescript', { onlyRemoveTypeImports: true }],
                  '@babel/preset-react',
                ],
                plugins: ['react-hot-loader/babel'],
              },
            },
          },
        ],
      },
      resolve: {
        ...config.resolve,
        modules: ['node_modules'],
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
      },
    };
  }

  return {
    ...config,
    devtool: 'source-map',
    module: {
      rules: [
        ...config.module.rules,
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: { browsers: 'last 2 versions, not dead, > 0.25%' },
                  },
                ],
                ['@babel/preset-typescript', { onlyRemoveTypeImports: true }],
                '@babel/preset-react',
              ],
            },
          },
        },
      ],
    },
  };
};

const config = createConfig();

module.exports = config;

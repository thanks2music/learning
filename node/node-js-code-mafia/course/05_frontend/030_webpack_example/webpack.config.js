const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  devtool: 'source-map',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.m?js$/, // .mjs, .js
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-optional-chaining']
        }
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: [
          'style-loader', // cssをhtmlのstyleタグに埋め込む
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     esModule: false,
          //   },
          // },
          'css-loader', // JavaScriptからcssを読み込む
          'postcss-loader', // Autoprefixerを読み込んで、ベンダープレフィックスを付与する
          'sass-loader' // Scss => cssに変換
        ]
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      }
    ]
  },
  devServer: {
    open: true,
    port: 9000,
    static: {
      directory: path.resolve(__dirname, 'dist')
    }
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: './css/style.css',
    // }),
    new CopyPlugin({
      patterns: [{ from: 'index.html', to: '.' }]
    })
  ]
};

// Webpack configuration
const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',

  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
  },

  output: {
    filename: (pathData) => {
      return pathData.chunk.name === 'main' ? '[name].[contenthash].js' : '[name].js'
    },
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: [/\.(png|jpg|svg)$/],
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext]',
        },
      },
      {
        test: [/\.(woff|woff2|ttf)$/],
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new CleanWebpackPlugin,
    new VueLoaderPlugin()
  ],
}

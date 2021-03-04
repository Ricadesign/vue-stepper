const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = function (env) {
  return {
    mode: 'production',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].min.js',
      libraryTarget: 'umd',
    },
    externals: {
      vuex: 'vuex',
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: ['vue-loader'],
        },
        {
          test: /\.scss/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [new VueLoaderPlugin(), new MiniCssExtractPlugin()],
    optimization: {
      minimize: true,
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },
  }
}

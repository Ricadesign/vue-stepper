const path = require('path')
const TerserPlugin = require("terser-webpack-plugin")
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
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(),
      ],
    },
  }
}

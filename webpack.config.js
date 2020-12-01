const path = require('path')
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
        }
      ],
    },
    plugins: [new VueLoaderPlugin()],
  }
}

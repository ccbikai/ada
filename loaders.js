const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const babelConfig = require('./babel.config')

module.exports = (type, options = {}) => {
  if (type === 'js') {
    return {
      loader: 'babel-loader',
      options: Object.assign({
        cacheDirectory: true
      }, babelConfig(options))
    }
  } else {
    return ExtractTextPlugin.extract({
      fallback: options.styleFallbackLoader || 'style-loader',
      use: [{
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: true
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: path.resolve(__dirname, 'postcss.config.js'),
            ctx: options
          }
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    })
  }
}

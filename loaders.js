const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (type, options) => {
  if (type === 'js') {
    return {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true
      }
    }
  } else {
    return ExtractTextPlugin.extract({
      fallback: options.styleFallbackLoader || 'style-loader',
      use: [{
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: true,
          minimize: {
            safe: true,
            autoprefixer: {
              add: true,
              remove: false
            }
          }
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

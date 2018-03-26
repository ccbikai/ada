const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (type, options = {}) => {
  if (type === 'js') {
    return {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: [
          require.resolve('babel-preset-env'),
          require.resolve('babel-preset-react')
        ],
        plugins: [
          require.resolve('babel-plugin-transform-runtime'),
          require.resolve('babel-plugin-syntax-dynamic-import'),
          !options.build && options.hot && require.resolve('react-hot-loader/babel')
        ].filter(Boolean)
      }
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

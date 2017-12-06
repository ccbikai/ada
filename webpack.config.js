const glob = require('glob')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// const SpritesmithPlugin = require('webpack-spritesmith');

const getEntry = (srcDir, options) => {
  options.debug && console.log('find js files in: ' + path.join(srcDir, 'js/*.js'))
  options.debug && console.log('find scss files in: ' + path.join(srcDir, 'scss/*.scss'))

  const entry = {}
  const jsFiles = glob.sync(path.join(srcDir, 'js/*.js'))
  const scssFiles = glob.sync(path.join(srcDir, 'scss/*.scss'))

  if (jsFiles.length) {
    jsFiles.forEach(file => {
      const filename = path.basename(file, '.js')

      entry[filename] = file
    })
  }

  if (scssFiles.length) {
    scssFiles.forEach(file => {
      const filename = path.basename(file)

      entry[filename] = file
    })
  }

  options.debug && console.log('found js,css files:\n', entry)

  return entry
}

const makeConig = (options) => {
  options.cwd = path.resolve(options.cwd)

  return {
    entry: getEntry(path.join(options.cwd, options.srcDir), options),
    output: {
      path: path.resolve(options.cwd, options.distDir),
      filename: '[name].js'
    },
    context: path.resolve(__dirname),
    devtool: options.build ? 'hidden-source-map' : 'inline-source-map',
    module: {
      rules: [{
        test: /\.js$/i,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }, {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:6].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      }, {
        test: /\.scss$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: path.join(__dirname, 'postcss.config.js'),
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
      }]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: (getPath) => {
          return getPath('[name]').replace('.scss', '.css')
        },
        allChunks: true
      })
      // new SpritesmithPlugin({
      //     src: {
      //         cwd: path.join(options.cwd, options.srcDir, 'icons'),
      //         glob: '*.png'
      //     },
      //     target: {
      //         image: path.resolve(options.cwd, options.srcDir, 'sprites/sprites.png'),
      //         css: path.resolve(options.cwd, options.srcDir, 'sprites/sprites.scss')
      //     },
      //     apiOptions: {
      //         cssImageRef: "~sprites.png"
      //     }
      // })
    ]
  }
}

module.exports = makeConig

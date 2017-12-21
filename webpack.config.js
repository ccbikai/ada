const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const SpritesmithPlugin = require('webpack-spritesmith')

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

  const config = {
    entry: getEntry(path.join(options.cwd, options.srcDir), options),
    output: {
      path: path.resolve(options.cwd, options.distDir),
      filename: 'js/[name].js',
      sourceMapFilename: 'maps/[file].map'
    },
    context: path.resolve(__dirname),
    devtool: options.build ? 'hidden-source-map' : 'inline-source-map',
    resolve: {
      modules: [
        path.join(process.cwd(), options.srcDir, 'hbs'),
        'node_modules'
      ]
    },
    module: {
      rules: [{
        test: /\.js$/i,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [require('babel-preset-env')],
            plugins: [require('babel-plugin-transform-runtime')]
          }
        }
      }, {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: options.build ? '[name].[hash:6].[ext]?imageslim' : '[name].[hash:6].[ext]',
              outputPath: 'images/',
              useRelativePath: true
            }
          }
        ]
      }, {
        test: /\.(hbs|handlebars)$/i,
        use: {
          loader: 'handlebars-loader',
          options: {
            debug: options.debug,
            helperDirs: [path.join(process.cwd(), options.srcDir, 'hbs/helpers')],
            partialDirs: [path.join(process.cwd(), options.srcDir, 'hbs/partials')]
          }
        }
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
          return getPath('css/[name]').replace('.scss', '.css')
        },
        allChunks: true
      }),
      new SpritesmithPlugin({
        src: {
          cwd: path.join(options.cwd, options.srcDir, 'icons'),
          glob: '*.png'
        },
        target: {
          image: path.resolve(options.cwd, options.srcDir, 'sprites/sprites.png'),
          css: path.resolve(options.cwd, options.srcDir, 'sprites/sprites.scss')
        },
        apiOptions: {
          cssImageRef: '../sprites/sprites.png'
        },
        spritesmithOptions: {
          padding: 8
        }
      })
    ]
  }

  if (options.build) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        exclude: [/node_modules/],
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            warnings: false
          },
          comments: false
        }
      })
    )
  } else {
    config.plugins.push(
      new FriendlyErrorsWebpackPlugin()
    )
  }

  return config
}

module.exports = makeConig

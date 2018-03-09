const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const SpritesmithPlugin = require('webpack-spritesmith')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const getEntry = (srcDir, options) => {
  options.debug && console.log('find js files in: ' + path.resolve(srcDir, 'js/*.js'))
  options.debug && console.log('find scss files in: ' + path.resolve(srcDir, 'scss/*.scss'))

  const entry = {}
  const jsFiles = glob.sync(path.resolve(srcDir, 'js/*.js'))
  const scssFiles = glob.sync(path.resolve(srcDir, 'scss/*.scss'))

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

  let config = {
    mode: options.build ? 'development' : 'production',
    performance: {
      maxEntrypointSize: options.build ? 250000 : 1000000,
      maxAssetSize: options.build ? 250000 : 1000000
    },
    entry: getEntry(path.resolve(options.cwd, options.srcDir), options),
    output: {
      path: path.resolve(options.cwd, options.distDir),
      filename: 'js/[name].js',
      sourceMapFilename: 'maps/[file].map'
    },
    context: path.resolve(__dirname),
    devtool: options.build ? 'hidden-source-map' : 'inline-source-map',
    resolve: {
      modules: [
        path.resolve(options.cwd, options.srcDir, 'hbs'),
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
              publicPath: '../images/',
              useRelativePath: false
            }
          }
        ]
      }, {
        test: /\.(hbs|handlebars)$/i,
        use: {
          loader: 'handlebars-loader',
          options: {
            debug: options.debug,
            helperDirs: [path.resolve(options.cwd, options.srcDir, 'hbs/helpers')],
            partialDirs: [path.resolve(options.cwd, options.srcDir, 'hbs/partials')]
          }
        }
      }, {
        test: /\.(scss|css)$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
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
          cwd: path.resolve(options.cwd, options.srcDir, 'icons'),
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
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      })
    )
  } else {
    config.plugins.push(
      new FriendlyErrorsWebpackPlugin()
    )
  }

  if (options.analyze) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: options.build ? 'server' : 'static',
        openAnalyzer: Boolean(options.build)
      })
    )
  }

  if (options.config) {
    const configPath = path.resolve(options.cwd, options.config)

    options.debug && console.log('configPath: ', configPath)

    const customConfig = require(configPath)

    options.debug && console.log('customConfig:\n', customConfig)
    config = webpackMerge(config, customConfig)
  }

  return config
}

module.exports = makeConig

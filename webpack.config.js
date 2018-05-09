const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const SpritesmithPlugin = require('webpack-spritesmith')
const { VueLoaderPlugin } = require('vue-loader')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const babelConfig = require('./babel.config')

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
    mode: options.build ? 'production' : 'development',
    performance: {
      maxEntrypointSize: options.build ? 250000 : 2000000,
      maxAssetSize: options.build ? 250000 : 2000000
    },
    entry: getEntry(path.resolve(options.cwd, options.srcDir), options),
    output: {
      path: path.resolve(options.cwd, options.distDir),
      publicPath: options.build ? (options.publicPath || `/${options.distDir}/`) : `${options.protocol || 'http:'}//${options.host}:${options.port}/${options.distDir}/`,
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].bundle.js',
      sourceMapFilename: 'maps/[file].map'
    },
    context: path.resolve(__dirname),
    devtool: options.build ? 'hidden-source-map' : 'cheap-module-eval-source-map',
    resolve: {
      extensions: ['.js', '.json', '.jsx'],
      modules: [
        path.resolve(options.cwd, options.srcDir, 'js'),
        path.resolve(options.cwd, options.srcDir, 'hbs'),
        path.resolve(options.cwd, options.srcDir, 'vue'),
        path.resolve(options.cwd, options.srcDir, 'components'),
        path.resolve(options.cwd, options.srcDir, 'scss'),
        'node_modules'
      ],
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/i,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        use: {
          loader: 'babel-loader',
          options: Object.assign({
            cacheDirectory: true
          }, babelConfig(options))
        }
      }, {
        test: /\.(scss|sass|css)$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
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
      }, {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            hotReload: options.hotVue
          }
        }
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
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 4096,
            name (file) {
              if (options.build && /\.(png|jpg|gif)$/i.test(file)) {
                return '[name].[hash:6].[ext]?imageslim'
              }

              return '[name].[hash:6].[ext]'
            },
            outputPath: 'assets/',
            publicPath: (file) => {
              if (options.build) {
                return (options.publicPath || `/${options.distDir}/`) + 'assets/' + file
              }

              return `${options.protocol || 'http:'}//${options.host}:${options.port}/${options.distDir}/assets/${file}`
            }
          }
        }]
      }]
    },
    plugins: [
      new VueLoaderPlugin(),
      new ExtractTextPlugin({
        filename: (getPath) => {
          const rewPath = getPath('css/[name]')

          if (rewPath.endsWith('.scss')) {
            return rewPath.replace('.scss', '.css')
          }

          return rewPath + '.css'
        },
        disable: options.hot,
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
          padding: 16
        }
      })
    ]
  }

  if (options.build) {
    // 构建时需要追加的插件
  } else {
    config.plugins.push(
      new FriendlyErrorsWebpackPlugin()
    )

    if (options.hot) {
      config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
      )
    }
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

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const rimraf = require('rimraf')

const getWebpackConfig = require('./webpack.config')

const startServer = options => {
  options.hot = options.hotReact || options.hotVue || false

  const webpackConfig = getWebpackConfig(options)

  options.debug && console.log('webpackConfig:\n', Object.assign({}, webpackConfig))

  if (!options.build) {
    Object.keys(webpackConfig.entry).forEach(name => {
      webpackConfig.entry[name] = [`webpack-dev-server/client?http://${options.host}:${options.port}`, webpackConfig.entry[name]]

      if (options.hot) {
        webpackConfig.entry[name].push('webpack/hot/only-dev-server')
      }
    })
  }

  const compiler = webpack(webpackConfig)
  const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    inline: true,
    hot: options.hot,
    quiet: true,
    publicPath: `/${options.distDir}/`,
    disableHostCheck: true
  })

  options.debug && console.log('startServer options:\n', devServerOptions)
  const server = new WebpackDevServer(compiler, devServerOptions)

  server.listen(options.port, options.host, () => {
    console.log(`ada starting server on http://${options.host}:${options.port}`)
  })
}

const build = options => {
  options.build = true

  const webpackConfig = getWebpackConfig(options)

  options.debug && console.log('webpackConfig:\n', Object.assign({}, webpackConfig))

  const compiler = webpack(webpackConfig)

  options.debug && console.log('build options:\n', options)
  compiler.run((err, stats) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }

    options.debug && console.log(stats.toJson('minimal'))
    const info = stats.toJson()

    if (stats.hasWarnings() && info.warnings.length) {
      console.warn(info.warnings)
    }

    if (stats.hasErrors()) {
      console.error(info.errors)
      process.exit(1)
    }

    rimraf.sync(`${path.resolve(options.cwd, options.distDir)}/**/*.scss.js`)
  })
}

module.exports = {
  startServer,
  build
}

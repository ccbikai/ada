const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const getWebpackConfig = require('./webpack.config')

const startServer = options => {
  const webpackConfig = getWebpackConfig(options)

  options.debug && console.log('webpackConfig:\n', Object.assign({}, webpackConfig))

  const compiler = webpack(webpackConfig)
  const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    publicPath: `/${options.distDir}/`,
    stats: {
      colors: true,
      children: false
    }
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
      return console.error(err)
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }

    options.debug && console.log(stats.toJson('minimal'))
  })
}

module.exports = {
  startServer,
  build
}

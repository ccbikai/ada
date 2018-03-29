const path = require('path')
const browserslist = require('browserslist')
const find = require('./utils/find')
const read = require('./utils/read')

const browserslistRc = browserslist.parseConfig(read(path.join(__dirname, '.browserslistrc')) || '').defaults

module.exports = options => {
  let config = browserslistRc

  if (options.srcDir && options.cwd) {
    const userConfig = find(options.srcDir, options.cwd, '.browserslistrc')
    let userRc = []

    if (userConfig) {
      userRc = browserslist.parseConfig(read(userConfig) || '').defaults
      config = [...new Set(config.concat(userRc))]
    }
  }

  options.debug && console.log('babelRc:', config)

  return config
}

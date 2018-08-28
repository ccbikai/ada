const path = require('path')
const browserlistConfig = require('./utils/browserlist')

module.exports = (ctx) => {
  // const { file, options, env } = ctx
  const {options = {}} = ctx
  const config = {
    plugins: {
      cssnano: {
        safe: true,
        autoprefixer: {
          add: true,
          remove: false,
          browsers: browserlistConfig(options)
        }
      }
    }
  }

  if (!options.noRem) {
    config.plugins['postcss-pxtorem'] = {
      rootValue: 40,
      replace: options.noPx, // 替换 PX
      unitPrecision: 5, // 保留5位小数字
      minPixelValue: 2, // 小于 2 时，不转换
      selectorBlackList: [], // 选择器黑名单，可以使用正则
      propWhiteList: [] // 属性名称为空，表示替换所有属性的值
    }
  }

  if (options.postcss) {
    const configPath = path.resolve(options.cwd, options.postcss)

    options.debug && console.log('postcssConfigPath: ', configPath)

    const customConfig = require(configPath)

    options.debug && console.log('postcssCustomConfig:\n', customConfig)

    Object.assign(config, customConfig)
  }

  return config
}

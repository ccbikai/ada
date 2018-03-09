module.exports = (ctx) => {
  // const { file, options, env } = ctx
  const {options} = ctx
  const plugins = {}

  if (!options.noRem) {
    plugins['postcss-pxtorem'] = {
      rootValue: 40,
      replace: options.noPx, // 替换 PX
      unitPrecision: 5, // 保留5位小数字
      minPixelValue: 2, // 小于 2 时，不转换
      selectorBlackList: [], // 选择器黑名单，可以使用正则
      propWhiteList: [] // 属性名称为空，表示替换所有属性的值
    }
  }

  Object.assign(plugins, {
    cssnano: {
      safe: true,
      autoprefixer: {
        add: true,
        remove: false
      }
    }
  })

  return {
    plugins
  }
}

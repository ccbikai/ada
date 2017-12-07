module.exports = (ctx) => {
  // const { file, options, env } = ctx

  return {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 40,
        replace: false,
        unitPrecision: 5, // 保留5位小数字
        minPixelValue: 2, // 小于 2 时，不转换
        selectorBlackList: [], // 选择器黑名单，可以使用正则
        propWhiteList: [] // 属性名称为空，表示替换所有属性的值
      },
      cssnano: {
        safe: true,
        autoprefixer: {
          add: true
        }
      }
    }
  }
}

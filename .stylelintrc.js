module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recommended-scss'],
  processors: [
    [
      '@mapbox/stylelint-processor-arbitrary-tags',
      {
        fileFilterRegex: [/\.vue$/]
      }
    ]
  ],
  rules: {
    'string-quotes': 'double'
  }
}

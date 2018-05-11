#!/usr/bin/env node

const yargs = require('yargs')

function run () {
  const ada = require('../index')

  if (arguments[0]._.includes('build')) {
    ada.build.apply(this, arguments)
  } else {
    ada.startServer.apply(this, arguments)
  }
}

yargs.options('debug', {
  type: 'boolean',
  default: false,
  describe: '调试模式'
}).options('host', {
  type: 'string',
  default: '127.0.0.1',
  describe: '服务器监听IP'
}).options('port', {
  type: 'number',
  default: 8080,
  describe: '服务器监听端口'
}).options('cwd', {
  type: 'string',
  default: process.cwd(),
  describe: '工作目录'
}).options('src', {
  type: 'string',
  default: 'src',
  alias: 'srcDir',
  describe: '源代码目录'
}).options('dist', {
  type: 'string',
  default: 'dist',
  alias: 'distDir',
  describe: '编译后代码目录'
}).options('public', {
  type: 'string',
  default: '',
  alias: 'publicPath',
  describe: '静态资源CDN目录'
}).options('hotVue', {
  type: 'boolean',
  default: false,
  describe: 'Vue 使用热刷新模式'
}).options('hotReact', {
  type: 'boolean',
  default: false,
  describe: 'React 使用热刷新模式'
}).options('noRem', {
  type: 'boolean',
  default: false,
  describe: '不自动转换 rem'
}).options('noPx', {
  type: 'boolean',
  default: false,
  describe: '自动转换 rem, 并且替换掉 px'
}).options('analyze', {
  type: 'boolean',
  default: false,
  describe: '开启性能分析模式'
}).options('config', {
  type: 'string',
  default: '',
  alias: 'c',
  describe: '自定义 webpack 配置'
}).options('postcss', {
  type: 'string',
  default: '',
  alias: 'p',
  describe: '自定义 postcss 配置'
})

yargs.usage('$0 [cmd] [args]') // eslint-disable-line
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')
  .epilog('Copyright http://ada.miantiao.me')
  .command('build', '生成线上包', () => {}, run)
  .command('$0', '打开开发服务器', () => {}, run)
  .argv

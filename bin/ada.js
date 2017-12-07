#!/usr/bin/env node

const yargs = require('yargs')
const ada = require('../index')

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
})

yargs.usage('$0 [cmd] [args]') // eslint-disable-line
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')
  .epilog('copyright http://miantiao.me')
  .command('build', '生成线上包', () => {}, ada.build)
  .command('$0', '打开开发服务器', () => {}, ada.startServer)
  .argv

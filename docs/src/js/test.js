import './common'

// hbs test
const tmpl = require('main.hbs')

const htmlStr = tmpl({
  name: '张三',
  age: 22,
  sexNum: 1
})

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('hbs-test').innerHTML = htmlStr
})

// lazy test
import('common/lazy.js').then(({LAZY}) => {
  console.log(LAZY)
})

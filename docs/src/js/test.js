const tmpl = require('main.hbs')

require('./common')

console.log('test2222')

const xxxxx = 11111111111111111

console.log(xxxxx)

const htmlStr = tmpl({
  name: '张三',
  age: 22,
  sexNum: 1
})

document.getElementById('hbs-test').innerHTML = htmlStr

import('./common/lazy.js').then(({LAZY}) => {
    console.log(LAZY)
})

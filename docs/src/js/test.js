const tmpl = require('main.hbs')

require('./common')

console.log('test')

const xxxxx = 11111111111111111

console.log(xxxxx)

const htmlStr = tmpl({
  name: '张三',
  age: 22,
  sexNum: 1
})

document.getElementById('hbs-test').innerHTML = htmlStr

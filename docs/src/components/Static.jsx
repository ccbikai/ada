import '../scss/test.scss'
import React from 'react'

export default function Static () {
  return <div className='wrap'>
    <h3>图片测试</h3>
    <div className='big' />
    <hr />
    <h3>图片(base64)测试, Autoprefixer 测试</h3>
    <div className='logo' />
    <hr />
    <h3>雪碧图测试</h3>
    <span className='icon icon-html5' />
    <span className='icon icon-twitter' />
    <span className='icon icon-instagram' />
    <span className='icon icon-facebook' />
    <span className='icon icon-youtube' />
    <hr />
    <h3>其他页面</h3>
    <a className='link' href='./index.html'>Index</a>
    <a className='link' href='./test.html'>Test</a>
    <a className='link' href='./test.vue.html'>Vue</a>
    <a className='link' href='./test.react.html'>React</a>
  </div>
}

require('./common')

document.addEventListener('DOMContentLoaded', () => {
  const links = Array.from(document.querySelectorAll('.link'))
  console.log(links.length)

  links.forEach(link => {
    console.log(link)
    link.setAttribute('target', '_blank')
  })

  const lazyload = Array.from(document.querySelectorAll('[data-src]'))

  lazyload.forEach(item => {
    item.setAttribute('src', item.getAttribute('data-src'))
  })
}, false)

window.addEventListener('load', () => {
  const lazyload = Array.from(document.querySelectorAll('[data-src]'))

  lazyload.forEach(item => {
    item.setAttribute('src', item.getAttribute('data-src'))
  })
}, false)

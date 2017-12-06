require('./common')

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.link')
  console.log(links.length)

  links.forEach(link => {
    console.log(link)
    link.setAttribute('target', '_blank')
  })
}, false)

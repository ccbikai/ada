const fs = require('fs')

const cache = {}

module.exports = (file) => {
  if (!file) { return false }

  cache[file] = cache[file] || fs.readFileSync(file, 'utf-8').toString()

  return cache[file]
}

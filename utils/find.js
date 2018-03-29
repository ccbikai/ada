const path = require('path')
const fs = require('fs')

const cache = {}

const exists = (file) => {
  if (!file) { return false }

  cache[file] = cache[file] || fs.existsSync(file)

  return cache[file]
}

const find = (from, to = '/', filename) => {
  if (!from || !filename) {
    return
  }

  from = path.resolve(to, from)

  const file = path.join(from, filename)

  if (exists(file)) {
    return file
  }

  if (from !== to) {
    // Reached root
    return find(path.dirname(from), to, filename)
  }
}

module.exports = find

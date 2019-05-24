const util = require('util')
const fs = require('fs')

import crawler from './crawler'

const writeFile = util.promisify(fs.writeFile)

const content = crawler('http://127.0.0.1:8080')


content.then(({ links, count }) => {
  writeFile('temp/content.json', JSON.stringify([...count]))
  writeFile('temp/links.json', JSON.stringify([...links]))

  return content
}).catch(error => error)

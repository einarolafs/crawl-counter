const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

import crawler from './crawler'

const adapter = new FileSync('temp/db.json')
const db = low(adapter)

db.defaults({ counts: {}, links: {} })
  .write()

const crawl = async (url = 'mbl.is') => {
  try {
    const counts = db.get('counts').value()
    const links = db.get('links').value()

    if (!links[url]) {
      console.log('found, moving on')

      return links
    }

    const { counts: newCounts, links: newLinks } = await crawler(url)

    if (newCounts) {
      Object.entries(newCounts).forEach(([key, value]) => {
        if (counts[key]) {
          counts[key] += value

          return null
        }

        counts[key] = value

        return null
      })
    }
    else {
      console.log('not defined', newCounts, url)
    }

    Object.entries(newLinks).forEach(([key, value]) => {
      if (!links[key]) {
        links[key] = value
      }
    })

    links[url] = false

    db.set('links', links).write()
    db.set('counts', counts).write()

    return newLinks
  }
  catch (error) {
    console.log('There is an error', error)

    return error
  }
}

crawl('http://mbl.is/')
  .then(links => Promise.all(Object.keys(links).map(async (key) => {
    if (links[key]) {
      const newLinks = await crawl(key)

      return newLinks
    }

    return null
  })))
  .catch(error => console.log(error))


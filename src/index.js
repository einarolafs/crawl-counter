const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

import crawler from './crawler'

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

const adapter = new FileSync('temp/db.json')
const db = low(adapter)

db.defaults({ counts: [], links: {} })
  .write()

const crawl = async (url = 'mbl.is') => {
  try {
    const counts = db.get('counts').value()
    const links = db.get('links').value()

    if (!links[url] && Object.keys(links).length > 0) {
      return links
    }

    const content = await crawler(url)

    const { counts: newCounts, links: newLinks } = content

    newCounts.forEach((newWord) => {
      const { word, count } = newWord
      const existingWord = counts.findIndex(item => item.word === word)

      if (existingWord >= 0) {
        counts[existingWord].count += count

        return null
      }

      return counts.push(newWord)
    })

    db.set('counts', counts).write()


    Object.entries(newLinks).forEach(([key, value]) => {
      if (!links[key]) {
        links[key] = value
      }
    })

    links[url] = false

    db.set('links', links).write()

    return newLinks
  }
  catch (error) {
    console.log('There is an error', error)

    return error
  }
}

crawl('http://mbl.is/')
  .then(async (data) => {
    const links = Object.keys(data)
    let result = null

    for (const link of links) {
      if (data[link]) {
        const newLinks = await crawl(link) // eslint-disable-line no-await-in-loop

        result = newLinks
      }
    }

    return result
  })
  .catch(error => console.log(error))


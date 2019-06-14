#!/usr/bin/env node
// Look into using http://www.tingodb.com/
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import crawler from './crawler'

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

const adapter = new FileSync('temp/db.json')
const db = low(adapter)

db.defaults({ counts: [], links: {} })
  .write()

const crawl = async (url) => {
  try {
    if (!url) {
      throw Error('Please provide a link')
    }

    const links = db.get('links').value()

    if (!links[url] && Object.keys(links).length > 0) {
      return links
    }

    const content = await crawler(url)

    const { counts: newCounts, links: newLinks } = content

    newCounts.forEach((newWord) => {
      const { word, count } = newWord
      const exists = db.get('counts').find({ word })
        .value()

      if (exists) {
        const newCount = exists.count + count

        return db.get('counts').find({ word })
          .assign({ count: newCount })
          .write()
      }

      return db.get('counts').push(newWord)
        .write()
    })

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

(async () => {
  const data = await crawl('http://mbl.is/')
  const links = Object.keys(data)

  for (const link of links) {
    if (data[link]) {
      await timeout(100) // eslint-disable-line no-await-in-loop
      await crawl(link) // eslint-disable-line no-await-in-loop
    }
  }
})()

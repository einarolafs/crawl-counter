
import db from '../database/database'
import getContent from './get-content'

const crawler = async (url) => {
  try {
    if (!url) {
      throw Error('Please provide a link')
    }

    const links = db.get('links').value()

    if (!links[url] && Object.keys(links).length > 0) {
      return links
    }

    const content = await getContent(url)

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

export default crawler

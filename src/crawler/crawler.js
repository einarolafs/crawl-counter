
import db from '../database'
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

    return db.addContent(content, url)
  }
  catch (error) {
    return error
  }
}

export default crawler

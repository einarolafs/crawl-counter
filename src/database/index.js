import database from './database'
import addCount from './add-count'
import addLinks from './add-links'

database.addContent = ({ counts, links }, url) => {
  addCount(counts, database)

  return addLinks(links, url, database)
}

export default database

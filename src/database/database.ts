/**
 * @todo Look into using http://www.tingodb.com/
 *
 */
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

import addCount, { WordCount } from './add-count'
import addLinks, { Links } from './add-links'

const adapter = new FileSync('temp/db.json')
const database = low(adapter)

database.defaults({ counts: [], links: {} })
  .write()

const addContent = ({ counts, links }: {counts: WordCount[], links: Links}, url: string) => {
  addCount(counts, database)

  return addLinks(links, url, database)
}

export default database
export {
  addContent
}

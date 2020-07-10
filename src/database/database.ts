/**
 * @todo Look into using http://www.tingodb.com/
 *
 */
import low from 'lowdb'
/* eslint-disable import/no-unresolved */
/* Ignore a false positive for this rule */
import FileSync from 'lowdb/adapters/FileSync'
/* eslint-enable */

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

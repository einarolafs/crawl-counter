// Look into using http://www.tingodb.com/
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const adapter = new FileSync('temp/db.json')
const database = low(adapter)

database.defaults({ counts: [], links: {} })
  .write()

export default database

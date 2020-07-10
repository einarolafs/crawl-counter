import db, { addContent } from '../database'
import getContent from './get-content'
import { DbProcess } from '../index'

const crawler = (url: string, dbProcess: DbProcess): Promise<string[]> => new Promise((resolve, reject) => {
  const checkProcess = setInterval(async () => {
    try {
      if (!dbProcess.isWriting) {
        clearInterval(checkProcess)

        /* block writings to the database */
        dbProcess.isWriting = true

        if (!url) {
          dbProcess.isWriting = false
          throw Error('No url provided to the crawler')
        }

        const links = db.get('links').value()

        if (!links[url] && Object.keys(links).length > 0) {
          dbProcess.isWriting = false
          resolve(links)

          return true
        }

        const content = await getContent(url)

        const linksFound = addContent(content, url)

        /* re-enable writing to the database */
        // eslint-disable-next-line require-atomic-updates
        dbProcess.isWriting = false

        resolve(linksFound)

        return true
      }

      return false
    }
    catch (error) {
      reject(error)
      dbProcess.isWriting = false

      return error
    }
  }, 500)
})

export default crawler

import cheerio from 'cheerio'
import request from 'request-promise'
import { stripAwayHtmlContent } from '../cleaners'
import { domainFromUrl } from '../selectors'
import getLinks from './get-links'
import getCount from './get-count'

/**
 * @typedef {Promise} getContentStructure
 * @property {Array} counts - Word count from html source
 * @property {Array} links - Links from same domain found in html source
 */

/**
 * This function get the text content only from a html source.
 * It uses {@link https://github.com/request/request-promise Request-Promise} to fetch the content from a url, as well as {@link https://cheerio.js.org/ cheerio} to create a jQuery like selectors around the html source content to more easily manipulate it.
 *
 * @memberof module:getContent
 * @async
 * @function
 * @requires cleaners/stripAwayHtmlContent
 * @requires selectors/domainFromUrl
 * @requires {@link https://cheerio.js.org/ cheerio}
 * @requires {@link https://github.com/request/request-promise Request-Promise}
 * @param {string} url
 * @returns {getContentStructure} - Promise that will return a object containing word count and links found
 */

const getContent = async (url: string) => {
  try {
    const normalizeUrl = url.startsWith('http') ? url : `http://${url}`

    const requestOptions = {
      header: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36'
      },
      uri: normalizeUrl
    }

    const html = await request(requestOptions)
    const content = cheerio.load(html, { decodeEntities: false })

    const text = stripAwayHtmlContent(content)
    const domain = domainFromUrl(url)

    return {
      counts: getCount(text),
      links: getLinks(content('body').html() || '', domain)
    }
  }
  catch (error) {
    return error
  }
}


export default getContent

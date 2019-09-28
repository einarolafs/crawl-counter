import cheerio from 'cheerio'
import request from 'request-promise'
import { stripAwayHtmlContent } from '../cleaners'
import { domainFromUrl } from '../selectors'
import getLinks from './get-links'
import getCount from './get-count'

const textContent = body => stripAwayHtmlContent(body)

/**
 * This function get the text content only from a html source.
 * It uses {@link https://github.com/request/request-promise Request-Promise} to fetch the content from a url, as well as {@link https://cheerio.js.org/ cheerio} to create a jQuery like selectors around the html source content to more easily manipulate it.
 * @memberof module:getContent
 * @function
 * @param {string} url
 * @return {string}
 */
const getContent = async (url) => {
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

    const text = textContent(content)
    const domain = domainFromUrl(url)

    const results = {
      counts: getCount(text),
      links: getLinks(content('body').html(), domain)
    }

    return results
  }
  catch (error) {
    return error
  }
}


export default getContent

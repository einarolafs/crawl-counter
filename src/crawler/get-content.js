import cheerio from 'cheerio'
import request from 'request-promise'
import { stripAwayHtmlContent, cleanUpString } from './cleaners'
import { hasNoLetters, isAnotherDomain, invalidLink, domainFromUrl } from './selectors'

const textContent = body => stripAwayHtmlContent(body)
  .replace(/<!--(.|\s)*?-->/gui, '')
  .replace(/<[^>]*>/gui, ' ')
  .replace(/\s\s+/gu, ' ')

const getCount = content => content.toLowerCase()
  .split(/\s/u)
  .reduce((acc, value) => {
    const word = cleanUpString(value)

    if (!isNaN(word) || hasNoLetters(word)) {
      return acc
    }

    const findWord = acc.findIndex(item => item.word === word) || acc.length
    const index = findWord >= 0 ? findWord : acc.length
    const { count = 0 } = acc[index] || []

    acc[index] = { count: count + 1, word }

    return acc
  }, [])

const getLinks = (content, domain) => {
  const normalizeDomain = domain[domain.length - 1] === '/' ? domain.slice(0, domain.length - 1) : domain
  const linksArray = content.match(/href="([^'"]+)/gum)
  const links = {}

  linksArray.forEach((link) => {
    const cleanLink = link.replace(/href="|#.+/gu, '')

    if (!cleanLink || isAnotherDomain(cleanLink, domain) || invalidLink(cleanLink)) {
      return null
    }

    if (!Object.keys(links).includes(link)) {
      cleanLink.startsWith('http')
        ? links[cleanLink] = true
        : links[`${normalizeDomain}${cleanLink}`] = true
    }

    return null
  })

  return links
}

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
    const content = cheerio.load(html, { decodeEntities: false }) // eslint-disable-line id-length

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

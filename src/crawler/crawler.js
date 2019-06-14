import cheerio from 'cheerio'
import request from 'request-promise'

const htmlItemsToStripAway = [
  'style',
  'script',
  '.tagcloud',
  '[class*=nav]',
  'header',
  'link',
  'nav',
  '[class*=fb-root]',
  'img'
]

const cleanUpString = (value) => {
  const regex = /^(@|-)|([!-\-/-?[-`{-~¡-¿–-⁊]|÷)|(,|\.)$/gu

  return value.replace(regex, '').replace(regex, '')
}

const hasNoLetters = value => !value.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/gu)

const textContent = (body) => {
  try {
    body.find(htmlItemsToStripAway.join()).remove()

    const content = body.html()
      .replace(/<!--(.|\s)*?-->/gui, '')
      .replace(/<[^>]*>/gui, ' ')
      .replace(/\s\s+/gu, ' ')

    return unescape(content)
  }
  catch (error) {
    return error
  }
}

const getCount = (content) => {
  try {
    return content.toLowerCase()
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
  }
  catch (error) {
    return error
  }
}

const getLinks = (content, domain) => {
  const normalizeDomain = domain[domain.length - 1] === '/' ? domain.slice(0, domain.length - 1) : domain
  const linksArray = content.match(/href="([^'"]+)/gum)
  const links = {}

  linksArray.forEach((link) => {
    let cleanLink = link.replace('href="', '')
    const startsWithHash = cleanLink.startsWith('#')
    const isAnotherDomain = cleanLink.startsWith('http') && !cleanLink.includes(domain)
    const isInvalid = cleanLink.match(/tel:|mailto:/ug)

    if (startsWithHash || isAnotherDomain || isInvalid) {
      return null
    }

    // Remove hashtags
    cleanLink = cleanLink.replace(/#.+/gu, '')

    if (!Object.keys(links).includes(link)) {
      cleanLink.startsWith('http')
        ? links[cleanLink] = true
        : links[`${normalizeDomain}${cleanLink}`] = true
    }

    return null
  })

  return links
}

const crawler = async function crawler (url) {
  try {
    const normalizeUrl = url.startsWith('http') ? url : `http://${url}`

    const [urlDomain] = normalizeUrl.match(/http(?:s)?:\/\/(?:[\w-]+\.)*([\w-]{1,63})(?:\.(?:\w{3}|\w{2}))(?:$|\/)/gu)

    const requestOptions = {
      header: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36'
      },
      uri: normalizeUrl
    }

    const html = await request(requestOptions)
    const $ = cheerio.load(html, { decodeEntities: false }) // eslint-disable-line id-length
    const body = $('body')

    const results = {
      counts: getCount(textContent(body)),
      links: getLinks(body.html(), urlDomain)
    }

    return results
  }
  catch (error) {
    return error
  }
}


export default crawler

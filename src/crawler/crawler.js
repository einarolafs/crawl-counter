import cheerio from 'cheerio'
import request from 'request-promise'

const textContent = (body) => {
  try {
    const htmlItemsToStripAway = [
      'style',
      'script',
      '.tagcloud',
      '[class*=nav]',
      'header',
      '[class*=header]',
      '[class*=menu]',
      'link',
      'nav',
      '[class*=fb-root]',
      '[class*=footer]',
      'footer',
      '[class*=extras]',
      '[class*=banner]',
      'img',
      '[class*=widget]'
    ]

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
    const wordCount = new Map()
    const wordCountObject = {}

    content.toLowerCase()
      .split(' ')
      .forEach((word) => {
        if (!isNaN(word)) {
          return null
        }

        const currentWordCount = wordCount.get(word) || 0

        wordCount.set(word, currentWordCount + 1)

        return null
      })

    const wordCountSorted = [...wordCount.entries()]
      .sort((first, next) => next[1] - first[1])

    wordCountSorted.forEach(([key, value]) => {
      wordCountObject[key] = value
    })

    return wordCountObject
  }
  catch (error) {
    return error
  }
}

const getLinks = (content, url) => {
  const normalizeURL = url[url.length - 1] === '/' ? url.slice(0, url.length - 1) : url
  const linksArray = content.match(/href="([^'"]+)/gum)
  const links = {}

  linksArray.forEach((link) => {
    let cleanLink = link.replace('href="', '')
    const startsWithHash = cleanLink.startsWith('#')
    const isAnotherDomain = cleanLink.startsWith('http') && !cleanLink.includes(url)

    if (startsWithHash || isAnotherDomain) {
      return null
    }

    cleanLink = cleanLink.replace(/#[a-zA-Z0-9]+/gu, '')

    if (!Object.keys(links).includes(link)) {
      cleanLink.startsWith('http')
        ? links[cleanLink] = true
        : links[`${normalizeURL}${cleanLink}`] = true
    }

    return null
  })

  return links
}

const crawler = async function crawler (domain) {
  try {
    const url = () => {
      if (domain.startsWith('http')) {
        return domain
      }

      return `http://${domain}`
    }

    const requestOptions = {
      header: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36' // eslint-disable-line max-len
      },
      uri: url()
    }

    const html = await request(requestOptions)
    const $ = cheerio.load(html, { decodeEntities: false }) // eslint-disable-line id-length, max-len
    const body = $('body')

    return {
      counts: getCount(textContent(body)),
      links: getLinks(body.html(), url())
    }
  }
  catch (error) {
    return error
  }
}


export default crawler

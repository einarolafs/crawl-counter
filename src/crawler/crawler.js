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

    content.toLowerCase()
      .split(' ')
      .forEach((word) => {
        const currentWordCount = wordCount.get(word) || 0

        wordCount.set(word, currentWordCount + 1)
      })

    const wordCountSorted = new Map([...wordCount.entries()]
      .sort((first, next) => next[1] - first[1]))

    return wordCountSorted
  }
  catch (error) {
    return error
  }
}

const getLinks = (content, url) => {
  const links = content.match(/href="([^'"]+)/gum)

  const normalizedLinks = links.reduce((result, link) => {
    const cleanLink = link.replace('href="', '')

    if (cleanLink.startsWith('#')) {
      return result
    }

    cleanLink.startsWith('http')
      ? result.push(cleanLink)
      : result.push(`${url}${cleanLink}`)

    return result
  }, [])

  return new Set(normalizedLinks)
}

const crawler = async function crawler (url) {
  const requestOptions = {
    header: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36' // eslint-disable-line max-len
    },
    uri: url
  }

  const html = await request(requestOptions)
  const $ = cheerio.load(html, { decodeEntities: false }) // eslint-disable-line id-length, max-len
  const body = $('body')

  return {
    count: getCount(textContent(body)),
    links: getLinks(body.html(), url)
  }
}


export default crawler

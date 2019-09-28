/**
 * Remove any html specific content from a cheerio object and return only text content
 * @memberof module:cleaners
 * @function
 * @param {object} content - Cheerio object
 * @return {string}
 */
const stripAwayHtmlContent = (content) => {
  const itemsToRemove = [
    'style',
    'script',
    'noscript',
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
    'iframe',
    '[class*=widget]'
  ]

  content(itemsToRemove.join()).remove()

  return content.html()
    .replace(/(?<comments><!--(.|\s)*?-->)|(?<HTMLelements><[^>]*>)|(?<spaces>\s\s+)|(?<lineBreaks>\r?\n|\r)/gui, ' ')
    .trim()
}

export default stripAwayHtmlContent

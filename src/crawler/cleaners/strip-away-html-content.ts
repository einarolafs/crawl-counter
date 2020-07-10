/**
 * Remove any html specific content from a {@link https://cheerio.js.org/ cheerio} object and return only text content
 *
 * @memberof module:cleaners
 * @function
 * @param {object} content - {@link https://cheerio.js.org/ cheerio} object
 * @returns {string} - text only content without any html elements
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

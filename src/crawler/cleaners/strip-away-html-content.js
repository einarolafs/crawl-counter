const fs = require('fs')

/**
 * Remove any html specific content from a html source and return only text content
 * @function
 * @param {string} content - Html source
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

  fs.writeFile(
    'content.html', content.html(), 'utf8',
    (err) => {
      if (err) {
        console.log('write file error', err)
      }
    }
  )

  return content.html().replace(/(?<comments><!--(.|\s)*?-->)|(?<HTMLelements><[^>]*>)|(?<spaces>\s\s+)|(?<lineBreaks>\r?\n|\r)/gui, ' ')
}

export default stripAwayHtmlContent

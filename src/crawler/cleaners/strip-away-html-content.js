const fs = require('fs')

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
    err => console.log(err)
  )

  return content.html()
}

export default stripAwayHtmlContent

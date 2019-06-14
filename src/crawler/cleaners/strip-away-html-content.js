const stripAwayHtmlContent = (content) => {
  const itemsToRemove = [
    'style',
    'script',
    '.tagcloud',
    '[class*=nav]',
    'header',
    'link',
    'nav',
    '[class*=fb-root]',
    'img'
  ].join()

  return content.find(itemsToRemove).remove()
}

export default stripAwayHtmlContent

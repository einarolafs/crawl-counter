const addLinks = (newLinks, url, db) => {
  const oldLinks = db.get('links').value()

  const links = { ...newLinks, ...oldLinks }

  links[url] = false

  return links
}

export default addLinks

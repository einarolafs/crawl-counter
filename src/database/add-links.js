const addLinks = (links, url, db) => {
  const newLinks = { ...links }

  Object.entries(newLinks).forEach(([key, value]) => {
    if (!newLinks[key]) {
      newLinks[key] = value
    }
  })

  newLinks[url] = false

  db.set('links', newLinks).write()

  return newLinks
}

export default addLinks

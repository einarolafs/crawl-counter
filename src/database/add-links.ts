import lowdb from 'lowdb'

export type Links = {
  [key: string]: boolean
}

type mockDatabaseFunction = {
  set: (key: string, links: Links) => {
    write: () => void
  }
}

const addLinks = (links: Links, url: string, db: mockDatabaseFunction) => {
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

import { isAnotherDomain, invalidLink } from '../selectors'

const getLinks = (content, domain) => {
  const normalizeDomain = domain.replace(/\/$/gu, '')
  const linksArray = content.match(/href="([^'"]+)/gum)
  const links = {}

  linksArray.forEach((link) => {
    const cleanLink = link.replace(/href="|#.+/gu, '')

    if (!cleanLink || isAnotherDomain(cleanLink, domain) || invalidLink(cleanLink)) {
      return null
    }

    if (!Object.keys(links).includes(link)) {
      cleanLink.startsWith('http')
        ? links[cleanLink] = true
        : links[`${normalizeDomain}${cleanLink}`] = true
    }

    return null
  })

  return links
}

export default getLinks

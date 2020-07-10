import { isAnotherDomain, invalidLink } from '../selectors'
import { Links } from '../../database/add-links'

/**
 * Get all links found in a html source that contain the given domain, returned as an object where each link is the key to prevent duplicates and all have a value of true to indicate that they are new and have not been crawled
 *
 * @memberof module:getContent
 * @function
 * @requires selectors/isAnotherDomain
 * @requires selectors/invalidLink
 * @param {string} content - html source content
 * @param {string} domain - source domain to be extracted
 * @returns {object} - returns an array of links
 */
const getLinks = (content: string, domain: string): Links => {
  const normalizeDomain = domain.replace(/\/$/gu, '')
  const linksArray = content.match(/href="([^'"]+)/gum) || []
  const links: Links = {}

  linksArray.forEach((link) => {
    const cleanLink = link.replace(/href="|#.+/gu, '')

    if (!cleanLink || isAnotherDomain(cleanLink, domain) || invalidLink(cleanLink)) {
      return
    }

    if (!Object.keys(links).includes(link)) {
      cleanLink.startsWith('http')
        ? links[cleanLink] = true
        : links[`${normalizeDomain}${cleanLink}`] = true
    }
  })

  return links
}

export default getLinks

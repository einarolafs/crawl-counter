/**
 * Checks a url link to make sure it is the same as the domain
 *
 * @memberof module:selectors
 * @function
 * @param {string} link - The url link that will be checked
 * @param {string} domain - a domain that will be checked if is included in the link
 * @returns {boolean} - returns true if the link is not the same as the domain
 */
const isAnotherDomain = (link: string, domain: string): boolean => link.startsWith('http') && !link.includes(domain)

export default isAnotherDomain

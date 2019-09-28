/**
 * Checks a url link to make sure it is the same as the domain
 * @memberof module:selectors
 * @function
 * @param {string} link - The url link that will be checked
 * @param {string} domain - a domain that will be checked if is included in the link
 * @return {boolean}
 */
const isAnotherDomain = (link, domain) => link.startsWith('http') && !link.includes(domain)

export default isAnotherDomain

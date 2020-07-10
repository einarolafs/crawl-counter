/**
 * Checks a url link that contains invalid format that are not common urls starting with http://, eg. if they contain hash, mailto or tel:
 *
 * @memberof module:selectors
 * @function
 * @param {string} link - The url link that will be extracted
 * @returns {boolean} - returns true if link is invalid, else false
 */
const invalidLink = (link: string): boolean => Boolean(link.match(/tel:|mailto:|^#/ug))

export default invalidLink

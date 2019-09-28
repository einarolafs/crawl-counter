/**
 * Checks a url link that contains invalid format that are not common urls starting with http://, eg. if they contain hash, mailto or tel:
 * @function
 * @param {string} link - The url link that will be extracted
 * @return {boolean}
 */
const invalidLink = link => link.match(/tel:|mailto:|^#/ug)

export default invalidLink

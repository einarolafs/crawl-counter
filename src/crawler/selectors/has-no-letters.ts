/**
 * A function that checks if a value contains no letters by using regex to make sure that there is no letters within the most common range of letters
 *
 * @memberof module:selectors
 * @function
 * @param {string} value - string to check against
 * @returns {boolean} - returns true if there are not letters in the string
 */
const hasNoLetters = value => !value.match(/[A-Za-zÀ-ÖØ-öø-ÿ]/gu)

export default hasNoLetters

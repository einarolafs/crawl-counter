/**
 * Remove any non-letter character from a word
 *
 * @memberof module:cleaners
 * @function
 * @param {string} value - string
 * @returns {string} - returns a string without any special characters
 */
const cleanUpString = (value: string): string => {
  const regex = /^(@|-)|([!-\-/-?[-`{-~¡-¿–-⁊]|÷)|(,|\.)$/gu

  return value.replace(regex, '').replace(regex, '')
}

export default cleanUpString

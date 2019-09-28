/**
 * Remove any non-letter character from a word
 * @memberof module:cleaners
 * @function
 * @param {string} value
 * @return {string}
 */
const cleanUpString = (value) => {
  const regex = /^(@|-)|([!-\-/-?[-`{-~¡-¿–-⁊]|÷)|(,|\.)$/gu

  return value.replace(regex, '').replace(regex, '')
}

export default cleanUpString

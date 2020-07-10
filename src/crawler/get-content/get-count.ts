import { cleanUpString } from '../cleaners'
import { hasNoLetters } from '../selectors'
import { WordCount } from '../../database/add-count'

/**
 * A function to extract, count and sort together all words found in a string content provided.
 * It will return object that contain the word and their counts.
 * Structure is design to work with {@link https://github.com/typicode/lowdb lowdb}
 *
 * @memberof module:getContent
 * @function
 * @requires module:selectors/hasNoLetters
 * @param {string} content - string that should contain only words
 * @returns {Array.<{count: number, word: string}>} - array of object containing words and their counts
 */
const getCount = (content: string) => content.toLowerCase()
  .split(/\s/ug)
  .reduce((acc: WordCount[], value: string) => {
    const word = cleanUpString(value)

    if (!isNaN(Number(word)) || hasNoLetters(word)) {
      return acc
    }

    const findWord = acc.findIndex(item => item.word === word) || acc.length
    const index = findWord >= 0 ? findWord : acc.length
    const { count = 0 } = acc[index] || []

    acc[index] = { count: count + 1, word }

    return acc
  }, [])

export default getCount

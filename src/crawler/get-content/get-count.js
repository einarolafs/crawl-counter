import { cleanUpString } from '../cleaners'
import { hasNoLetters } from '../selectors'

const getCount = content => content.toLowerCase()
  .split(/\s/u)
  .reduce((acc, value) => {
    const word = cleanUpString(value)

    if (!isNaN(word) || hasNoLetters(word)) {
      return acc
    }

    const findWord = acc.findIndex(item => item.word === word) || acc.length
    const index = findWord >= 0 ? findWord : acc.length
    const { count = 0 } = acc[index] || []

    acc[index] = { count: count + 1, word }

    return acc
  }, [])

export default getCount

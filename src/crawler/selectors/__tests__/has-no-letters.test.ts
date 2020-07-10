import test from 'ava'
import hasNoLetters from '../has-no-letters'

test('hasNoLetters()', (t) => {
  const hasLetters = hasNoLetters('contain letters')
  const uncleanWord = hasNoLetters('.')

  t.false(hasLetters)
  t.true(uncleanWord)
})

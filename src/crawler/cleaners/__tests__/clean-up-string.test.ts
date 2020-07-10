import test from 'ava'
import cleanUpString from '../clean-up-string'

test('hasNoLetters()', (t) => {
  const result = cleanUpString('?content')
  const expected = 'content'

  t.is(result, expected)
})

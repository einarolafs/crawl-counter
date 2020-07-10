import test from 'ava'
import invalidLink from '../invalid-link'

test('invalidLink()', (t) => {
  const correctLink = invalidLink('http://link.com')
  const incorrectLink = invalidLink('mailto://email@mail.com')

  t.false(correctLink)
  t.true(incorrectLink)
})

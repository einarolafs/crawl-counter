import test from 'ava'
import isAnotherDomain from '../is-another-domain'

test('hasNoLetters()', (t) => {
  const mainDomain = 'http://www.domain.com'
  const isSameDomain = isAnotherDomain('http://www.domain.com/foo/bar', mainDomain)
  const differentDomain = isAnotherDomain('http://www.anotherdomain.is/foo/bar', mainDomain)

  t.false(isSameDomain)
  t.true(differentDomain)
})

import test from 'ava'
import domainFromUrl from './domain-from-url'

test('foo', (t) => {
  const domain = domainFromUrl('http://www.mbl.is/extra/content')

  if (domain === 'http://www.mbl.is/') {
    t.pass()
  }
})

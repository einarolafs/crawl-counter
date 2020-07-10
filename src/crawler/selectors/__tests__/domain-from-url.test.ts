import domainFromUrl from '../domain-from-url'

describe('domainFromUrl()', () => {
  test('Return the correct domain from a url', () => {
    const domain = 'http://www.mbl.is/'
    const actual = domainFromUrl(`${domain}extra/content`)

    expect(actual).toBe(domain)
  })
})

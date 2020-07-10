import isAnotherDomain from '../is-another-domain'

describe('isAAnotherDomain', () => {
  const mainDomain = 'http://www.domain.com'

  test('Return FALSE if a link contains another domain', () => {
    const isSameDomain = isAnotherDomain('http://www.domain.com/foo/bar', mainDomain)

    expect(isSameDomain).toBeFalsy()
  })

  test('Return TRUE if a link contains same domain', () => {
    const differentDomain = isAnotherDomain('http://www.anotherdomain.is/foo/bar', mainDomain)

    expect(differentDomain).toBeTruthy()
  })
})

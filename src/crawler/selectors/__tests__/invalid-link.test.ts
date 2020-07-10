import invalidLink from '../invalid-link'

describe('invalidLink()', () => {
  test('Should return FALSE if link is normal website link', () => {
    const correctLink = invalidLink('http://link.com')

    expect(correctLink).toBeFalsy()
  })

  test('Should return TRUe if the link is not a normal website link', () => {
    const incorrectLink = invalidLink('mailto://email@mail.com')

    expect(incorrectLink).toBeTruthy()
  })
})

import cleanUpString from '../clean-up-string'

describe('clearnUpString()', () => {
  const result = cleanUpString('?content')
  const expected = 'content'

  test('Returns a string that contains no special letters', () => {
    expect(result).toBe(expected)
  })
})

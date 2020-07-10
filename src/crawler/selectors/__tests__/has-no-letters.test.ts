import hasNoLetters from '../has-no-letters'

describe('hasNoLetters()', () => {
  test('Returns false if there are some letters', () => {
    const hasLetters = hasNoLetters('contain letters')

    expect(hasLetters).toBeFalsy()
  })

  test('Returns true if there are no letters', () => {
    const uncleanWord = hasNoLetters('.#%//)%#')

    expect(uncleanWord).toBeTruthy()
  })
})

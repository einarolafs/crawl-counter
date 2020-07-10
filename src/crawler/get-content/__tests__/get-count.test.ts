import getCount from '../get-count'

describe('hasNoLetters()', () => {
  test('Returns correct structure', () => {
  // eslint-disable-next-line quotes
    const textContent = `In 2005 Nature published a peer review comparing 42 hard science articles from Encyclopædia Britannica and Wikipedia and found that Wikipedia's level of accuracy approached that of Britannica although critics suggested that it might not have fared so well in a similar study of a random sampling of all articles or one focused on social science or contentious social issues The following year Time magazine stated that the open-door policy of allowing anyone to edit had made Wikipedia the biggest and possibly the best encyclopedia in the world and was a testament to the vision of Jimmy Wales`

    const result = getCount(textContent)

    // eslint-disable-next-line object-curly-spacing, comma-spacing, key-spacing, array-element-newline
    const expected = [{'count':1,'word':'in'},{'count':1,'word':'nature'},{'count':1,'word':'published'},{'count':4,'word':'a'},{'count':1,'word':'peer'},{'count':1,'word':'review'},{'count':1,'word':'comparing'},{'count':1,'word':'hard'},{'count':2,'word':'science'},{'count':2,'word':'articles'},{'count':1,'word':'from'},{'count':1,'word':'encyclopædia'},{'count':2,'word':'britannica'},{'count':4,'word':'and'},{'count':2,'word':'wikipedia'},{'count':1,'word':'found'},{'count':4,'word':'that'},{'count':1,'word':'wikipedias'},{'count':1,'word':'level'},{'count':6,'word':'of'},{'count':1,'word':'accuracy'},{'count':1,'word':'approached'},{'count':1,'word':'although'},{'count':1,'word':'critics'},{'count':1,'word':'suggested'},{'count':1,'word':'it'},{'count':1,'word':'might'},{'count':1,'word':'not'},{'count':1,'word':'have'},{'count':1,'word':'fared'},{'count':1,'word':'so'},{'count':1,'word':'well'},{'count':1,'word':'in'},{'count':1,'word':'similar'},{'count':1,'word':'study'},{'count':1,'word':'random'},{'count':1,'word':'sampling'},{'count':1,'word':'all'},{'count':2,'word':'or'},{'count':1,'word':'one'},{'count':1,'word':'focused'},{'count':1,'word':'on'},{'count':2,'word':'social'},{'count':1,'word':'contentious'},{'count':1,'word':'issues'},{'count':6,'word':'the'},{'count':1,'word':'following'},{'count':1,'word':'year'},{'count':1,'word':'time'},{'count':1,'word':'magazine'},{'count':1,'word':'stated'},{'count':1,'word':'opendoor'},{'count':1,'word':'policy'},{'count':1,'word':'allowing'},{'count':1,'word':'anyone'},{'count':2,'word':'to'},{'count':1,'word':'edit'},{'count':1,'word':'had'},{'count':1,'word':'made'},{'count':1,'word':'biggest'},{'count':1,'word':'possibly'},{'count':1,'word':'best'},{'count':1,'word':'encyclopedia'},{'count':1,'word':'in'},{'count':1,'word':'world'},{'count':1,'word':'was'},{'count':1,'word':'testament'},{'count':1,'word':'vision'},{'count':1,'word':'jimmy'},{'count':1,'word':'wales'}]

    expect(result).toStrictEqual(expected)
  })
})

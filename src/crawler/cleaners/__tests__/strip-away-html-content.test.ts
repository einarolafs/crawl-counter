import cheerio from 'cheerio'
import stripAwayHtmlContent from '../strip-away-html-content'

describe('stripAwayHtmlContent()', () => {
  const htmlContent = cheerio.load('<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>')

  const result = stripAwayHtmlContent(htmlContent)
  const expected = 'My First Heading  My first paragraph.'

  test('Should not contain any HTML markup', () => {
    expect(result).toBe(expected)
  })
})

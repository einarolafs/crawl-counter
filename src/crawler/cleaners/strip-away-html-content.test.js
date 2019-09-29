import test from 'ava'
import cheerio from 'cheerio'
import stripAwayHtmlContent from './strip-away-html-content'

test('hasNoLetters()', (t) => {
  const htmlContent = cheerio.load('<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>')

  const result = stripAwayHtmlContent(htmlContent)
  const expected = 'My First Heading  My first paragraph.'

  t.is(result, expected)
})

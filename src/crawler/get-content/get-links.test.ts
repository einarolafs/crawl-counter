import test from 'ava'
import getLinks from './get-links'

test('hasNoLetters()', (t) => {
  const htmlContent = `
    <!DOCTYPE html>
      <html>
      <body>
        <a href="http://www.domain.com/link/foo/bar">
        <a href="/link2/foo/bar">
        <a href="http://www.anotherdomain.com/link/foo/bar">
      </body>
    </html>
  `

  const result = getLinks(htmlContent, 'http://www.domain.com/')

  const expected = {
    'http://www.domain.com/link/foo/bar': true,
    'http://www.domain.com/link2/foo/bar': true
  }

  t.deepEqual(result, expected)
})

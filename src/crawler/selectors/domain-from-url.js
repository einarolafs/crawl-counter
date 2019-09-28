/**
 * A function that extracts a domain from a url
 * @function
 * @param {string} url - The url string that will be extracted
 * @return {string} - The domain extracted from the url
 */
const domainFromUrl = (url) => {
  const [domain] = url.match(/http(?:s)?:\/\/(?:[\w-]+\.)*([\w-]{1,63})(?:\.(?:\w{3}|\w{2}))(?:$|\/)/gu)

  return domain
}

export default domainFromUrl

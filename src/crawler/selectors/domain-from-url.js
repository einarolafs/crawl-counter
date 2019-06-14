const domainFromUrl = (url) => {
  const [domain] = url.match(/http(?:s)?:\/\/(?:[\w-]+\.)*([\w-]{1,63})(?:\.(?:\w{3}|\w{2}))(?:$|\/)/gu)

  return domain
}

export default domainFromUrl

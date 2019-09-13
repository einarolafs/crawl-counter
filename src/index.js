#!/usr/bin/env node
import crawler from './crawler'
import args from './cli-config'

const { url: [url] = [] } = args

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

const runCrawler = async () => {
  if (!url) {
    console.log('Missing url argument, use --url http://domain.com')

    return null
  }

  const data = await crawler(url)
  const links = Object.keys(data)

  for (const link of links) {
    if (data[link]) {
      await timeout(100) // eslint-disable-line no-await-in-loop
      await crawler(link) // eslint-disable-line no-await-in-loop
    }
  }

  return null
}

runCrawler()

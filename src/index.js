#!/usr/bin/env node
import crawler from './crawler'

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

const runCrawler = async () => {
  const data = await crawler('http://mbl.is/')
  const links = Object.keys(data)

  for (const link of links) {
    if (data[link]) {
      await timeout(100) // eslint-disable-line no-await-in-loop
      await crawler(link) // eslint-disable-line no-await-in-loop
    }
  }
}

runCrawler()

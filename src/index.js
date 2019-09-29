#!/usr/bin/env node
const ora = require('ora')

import crawler from './crawler'
import args from './cli-config'

const { url: [url] = [] } = args

const runCrawler = async () => {
  const dbProcess = {
    isWriting: false
  }
  const spinner = ora('Crawling website').start()

  spinner.color = 'green'

  try {
    if (!url) {
      throw Error('Missing url argument, use --url http://domain.com')
    }

    const data = await crawler(url, dbProcess)
    const links = Object.keys(data)

    for (const link of links) {
      if (data[link]) {
        await crawler(link, dbProcess) // eslint-disable-line no-await-in-loop
      }
    }

    spinner.succeed('Crawling successful, note that the crawling is only shallow, run script again to crawl more links')

    return true
  }
  catch (error) {
    spinner.fail(error.message)

    return false
  }
}

runCrawler()

#!/usr/bin/env node
require("@babel/register")({extensions: ['.js', '.ts']})
const ora = require('ora')

import crawler from './crawler'
import args from './cli-config'

export type DbProcess = {
  isWriting: boolean
}

const { url: [url] = [] }: {url: string[]} = args

const runCrawler = async () => {
  const dbProcess: DbProcess = {
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

    const results = []

    for (const link of links) {
      if (data[link]) {
        results.push(crawler(link, dbProcess))
      }
    }

    await Promise.all(results)

    spinner.succeed('Crawling successful, note that the crawling is only shallow, run script again to crawl more links')

    return true
  }
  catch (error) {
    spinner.fail(error.message)

    return false
  }
}

runCrawler()

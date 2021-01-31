#!/usr/bin/env node
const ora = require('ora')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

import db from './database'
import crawler from './crawler'
// import args from './cli-config'

const { url, continue: continueCrawl = false } = yargs(hideBin(process.argv)).argv

// console.log(yargs(hideBin(process.argv)).argv)

const runCrawler = async () => {
  const dbProcess = {
    isWriting: false
  }
  const spinner = ora('Crawling website').start()

  spinner.color = 'green'

  try {
    if (!url && !continueCrawl) {
      throw Error('Missing url argument, use --url http://domain.com')
    }

    let links = db.get('links').value()

    if (url) {
      const newLinks = await crawler(url, dbProcess)

      links = { ...newLinks, ...links }
    }

    const results = []

    for (const link of Object.keys(links)) {
      if (links[link]) {
        results.push(crawler(link, dbProcess))
      }
    }

    // array of object
    const values = await Promise.all(results)

    const flattenData = values.reduce((acc, obj) => ({ ...obj, ...acc }), {})

    db.set('links', flattenData).write()

    spinner.succeed('Crawling successful, note that the crawling is only shallow, run script again to crawl more links')

    return true
  }
  catch (error) {
    spinner.fail(error.message)

    return false
  }
}

runCrawler()

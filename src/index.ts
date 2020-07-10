#!/usr/bin/env node
import ora from 'ora'

import crawler from './crawler'
import args from './cli-config'

export type DbProcess = {
  isWriting: boolean
}

interface CrawlCommandLineOptions {
  url: string[]
}

const { url: [url] = [] } = <CrawlCommandLineOptions>args

const runCrawler = async (): Promise<void> => {
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
      if (data[link as any]) {
        results.push(crawler(link, dbProcess))
      }
    }

    await Promise.all(results)

    spinner.succeed('Crawling successful, note that the crawling is only shallow, run script again to crawl more links')
  }
  catch (error) {
    spinner.fail(error)
  }
}

runCrawler()
  .then(() => null)
  .catch(() => null)

# crawl-counter

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Feinsiol%2Fcrawl-counter%2Fbadge%3Fref%3Dmaster&style=flat)](https://actions-badge.atrox.dev/einsiol/crawl-counter/goto?ref=master)

A CLI tool to collect all word found on a website and collect them onto a database in a local JSON format.

## How to run

To start the program, simply run `npm start -- --url http://domain.com`

The program only does a shallow crawl and collect links for another run, to continue more crawls, run `npm start -- --url http://domain.com`

## Get documentation

Code documentation is based on JSdocs, to build and view the documents locally run `npm run docs`

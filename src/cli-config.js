/* eslint-disable sort-keys */
import commandLineArgs from 'command-line-args'

const optionDefinitions = [{ name: 'url', type: String, multiple: true, defaultOption: true }]

export default commandLineArgs(optionDefinitions)

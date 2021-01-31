/* eslint-disable sort-keys */
export default {
  require: ['esm', '@babel/register'],
  babel: {
    testOptions: {
      presets: [['module:@ava/babel/stage-4', { modules: false }]]
    }
  },
  files: ['src/**/*.test.js']
}

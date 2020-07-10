module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './'
  },
  env: {
    'node': true,
    'commonjs': true,
    "jquery": true, // in order to support cheerio functions
    "jest/globals": true
  },
  settings: {
    'import/resolver': {
      "typescript": {}
    },
    "import/extensions": [".js", ".ts",],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.d.ts', '.js']
    }
  },
  plugins: [
    '@typescript-eslint',
    'jest',
    'import',
    'node',
    'promise',
    'filenames',
    'jsdoc',
  ],
  extends: [
    'eslint:all',
    'plugin:promise/recommended',
    'plugin:jsdoc/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/recommended'
  ],
  rules: {
    'brace-style': ["error", "stroustrup"],
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'array-element-newline': ["error", { "minItems": 4 }],
    "capitalized-comments": "off",
    'dot-location': 'off',
    'eol-last': ['error', 'always'],
    'function-call-argument-newline': 'off',
    'guard-for-in': 'off',
    'id-length': ['error', { 'exceptions': ['t'] }],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'no-var': 'error',
    'no-magic-numbers': 'off',
    'one-var': 'off',
    'max-lines-per-function': 'off', //should only be temporary
    'no-extend-native': 'error',
    'no-console': 'warn',
    'no-plusplus': 'off',
    'no-process-env': 'off',
    'no-prototype-builtins': 'error',
    'no-unused-expressions': ['error', { "allowTernary": true } ],
    'no-ternary': 'off',
    'no-invalid-this': 'off',
    'object-property-newline': 'off',
    "sort-keys": ["error", "asc", {"caseSensitive": true, "natural": true}],
    'sort-imports': 'off',
    'object-curly-spacing': ["error", "always"],
    'max-statements': 'off',
    'max-lines': ['error', 330],
    'max-len': 'off',
    'multiline-ternary': 'off',
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: '*', next: 'return' }
    ],
    'prefer-named-capture-group': 'off',
    'quotes': ['error','single'],
    'quote-props': 'off',
    'semi': ['error','never'],

    // https://github.com/selaux/eslint-plugin-filenames#rules
    'filenames/match-exported': ['error', 'kebab'],
    'filenames/no-index': 'off',
  }
}
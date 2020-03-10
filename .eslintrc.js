module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'max-len': ['error', {
      code: 120,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],
    quotes: 'off',
    "@typescript-eslint/member-delimiter-style": ['error', {
      multiline: {
        delimiter: 'semi',
        requireLast: true
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false
      }
    }],
    "@typescript-eslint/quotes": ['error',
      'single', {
        avoidEscape: true,
        allowTemplateLiterals: true,
    }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-underscore-dangle': [2, {
      allowAfterThis: true,
      allow: [],
    }],
    'import/default': [0],
    'import/order': [2, {
      groups: [
        ['external', 'builtin'],
        'internal',
        ['parent', 'sibling', 'index']
      ],
      'newlines-between': 'always-and-inside-groups',
      alphabetize: {
        order: 'asc',
        caseInsensitive: false
      }
    }],
  },
};

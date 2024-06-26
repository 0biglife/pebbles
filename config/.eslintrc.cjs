module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // extends: ['eslint-config-w'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    quotes: ['double'],
  },
};

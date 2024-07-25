/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  ignorePatterns: ['**/.next/**', '**/node_modules/**'],
  root: true,
};

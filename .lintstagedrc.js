const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

/** @type {import('lint-staged').Config} */
module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, 'prettier --write'],
  '!(*.js|*.jsx|*.ts|*.tsx)': 'prettier --write --ignore-unknown',
};

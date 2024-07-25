const path = require('node:path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

/** @type {import('lint-staged').Config} */
module.exports = {
  '*.{js,jsx,mjs,ts,tsx,mts}': [
    'prettier --with-node-modules --ignore-path .prettierignore --write',
    buildEslintCommand,
  ],
  '*.{json,md,mdx,css,html,yml,yaml,scss}': [
    'prettier --with-node-modules --ignore-path .prettierignore --write',
  ],
};

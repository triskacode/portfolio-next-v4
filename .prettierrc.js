const styleguide = require('@vercel/style-guide/prettier');
const { plugins: _plugins } = styleguide;

module.exports = {
  ...styleguide,
  plugins: [..._plugins, 'prettier-plugin-tailwindcss'],
};

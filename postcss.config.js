/** @type {import('postcss-load-config').Config} */

module.exports = {
  plugins: [
    require('postcss-nested'),
    require('autoprefixer'),
    require('postcss-simple-vars'),
    require('postcss-calc'),
    require('postcss-for')
  ]
};
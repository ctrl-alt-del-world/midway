const p = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-cssnext'),
    require('postcss-calc'),
    require('postcss-discard-comments'),
    require('postcss-reporter'),
    p ? require('cssnano') : ''
  ]
}

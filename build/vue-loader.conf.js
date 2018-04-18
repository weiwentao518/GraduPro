'use strict'
var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
var postcssConfig = require('./postcss.config.js')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  postcss:postcssConfig.postfactory
}

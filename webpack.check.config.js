const { smart } = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const webpackConfig = require('./webpack.prod.config')

module.exports = smart(webpackConfig, {
  plugins: [new BundleAnalyzerPlugin()]
})

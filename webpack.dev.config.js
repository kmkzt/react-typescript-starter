const { HotModuleReplacementPlugin } = require('webpack')
const { smart } = require('webpack-merge')
const baseConfig = require('./webpack.config')
const ssrMode = process.argv && process.argv.includes('--ssr')

module.exports = ssrMode
  ? [baseConfig(true), baseConfig()]
  : smart(baseConfig(), {
      devtool: 'source-map',
      devServer: {
        contentBase: './build',
        compress: true,
        port: 9000,
        overlay: true,
        hot: true,
        historyApiFallback: true
      },
      plugins: [new HotModuleReplacementPlugin()]
    })

const { HotModuleReplacementPlugin } = require('webpack')
const { smart } = require('webpack-merge')
const common = require('./webpack.config')

module.exports = smart(common, {
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

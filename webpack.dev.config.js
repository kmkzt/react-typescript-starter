const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 9000,
    overlay: true,
    hot: true,
    historyApiFallback: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}

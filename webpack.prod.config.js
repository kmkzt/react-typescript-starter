
const { GenerateSW } = require('workbox-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// https://github.com/terser-js/terser#minify-options

module.exports = {
  devtool: false,
  plugins: [new GenerateSW()],
  optimization: {
    namedModules: true,
    namedChunks: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        extractComments: 'all',
        terserOptions: {
          compress: {
            arrows: true,
            drop_console: true,
            booleans: true
          },
          sourceMap: true,
          ecma: 5, // specify one of: 5, 6, 7 or 8
          keep_classnames: false,
          keep_fnames: false,
          module: true,
          output: null,
          ie8: false,
          nameCache: null, // or specify a name cache object
          safari10: false,
          toplevel: true,
          warnings: false
        }
      })
    ],
    minimize: true,
    splitChunks: {
      chunks: 'async',
      minSize: 1000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        reactmodules: {
          test: /[\\/]node_modules[\\/]react|styled|polished/,
          name: 'reactmodule',
          priority: -10,
          chunks: 'all'
        },
        apollomodules: {
          test: /[\\/]node_modules[\\/]apollo|graphql/,
          name: 'apollomodules',
          priority: -11,
          chunks: 'all'
        },
        amplify: {
          test: /[\\/]node_modules[\\/]aws-amplify/,
          name: 'amplify',
          priority: -14,
          chunks: 'all'
        },
        appsync: {
          test: /[\\/]node_modules[\\/]aws-appsync/,
          name: 'awsmodule',
          priority: -15,
          chunks: 'all'
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -16,
          chunks: 'all'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}

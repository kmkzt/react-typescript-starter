const { resolve } = require('path')
const { smart } = require('webpack-merge')
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin') // https://github.com/terser-js/terser#minify-options
const common = require('./webpack.config')

const excludeVendorModule = []

module.exports = smart(common, {
  devtool: false,
  plugins: [
    new GenerateSW({
      swDest: 'sw.js',
      globDirectory: resolve(__dirname, 'build'),
      globPatterns: ['**/*.{html,js,css}', '**/*.{jpg,jpeg,png,gif,webp,svg}'],
      globIgnores: ['**/node_modules/**/*'],
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\.html/,
          handler: 'networkFirst',
          options: {
            cacheName: 'html',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 10
            }
          }
        },
        {
          urlPattern: /\.js/,
          handler: 'networkFirst',
          options: {
            cacheName: 'js',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 2
            }
          }
        },
        {
          urlPattern: /\.(png|svg|woff|ttf|eot|json)/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'assets',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 7
            }
          }
        },
        {
          urlPattern: new RegExp('https://hacker-news.firebaseio.com/v0/'),
          handler: 'cacheFirst',
          options: {
            cacheName: 'hnApi',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 3
            }
          }
        }
      ]
    })
  ],
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
          test: /[\\/]node_modules[\\/]react|styled/,
          name: 'reactmodule',
          priority: -10,
          chunks: 'all'
        },
        vendors: {
          test(mod, chunk) {
            if (!/[\\/]node_modules[\\/]/.test(mod.resource)) {
              return false
            }
            return (
              excludeVendorModule.length === 0 ||
              excludeVendorModule.some(
                libname => mod.resource && mod.resource.includes(libname)
              )
            )
          },
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
})

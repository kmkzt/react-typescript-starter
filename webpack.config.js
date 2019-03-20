const { resolve } = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const devMode = process.env.NODE_ENV === 'development'

const entry = ssr =>
  ssr
    ? {
        server: resolve(__dirname, 'src/server.tsx')
      }
    : {
        client: resolve(__dirname, 'src/client.tsx')
      }

const output = ssr => (ssr ? '[name].js' : 'js/[name].js')
const target = ssr => (ssr ? 'node' : 'web')
const plugin = ssr =>
  ssr
    ? []
    : [
        new CleanWebpackPlugin(),
        new FaviconsWebpackPlugin({
          logo: './logo.svg',
          prefix: 'icons/',
          //  Emit all stats of the generated icons
          emitStats: false,
          // The name of the json containing all favicon information
          statsFilename: 'iconstats.json',
          // Generate a cache file with control hashes and
          // don't rebuild the favicons until those hashes change
          persistentCache: true,
          // Inject the html into the html-webpack-plugin
          inject: true,
          // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
          background: '#fff',
          // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
          title: 'React hooks hackernews',
          // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
          icons: {
            android: true,
            appleIcon: true,
            appleStartup: true,
            coast: false,
            favicons: true,
            firefox: true,
            opengraph: false,
            twitter: false,
            yandex: false,
            windows: false
          }
        }),
        new HtmlWebpackPlugin({
          meta: {
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            'theme-color': '#24d'
          },
          base: {
            href: '/'
          },
          title: 'react hooks hackernews',
          template: 'template.html',
          hash: true,
          minify: true,
          cache: !devMode
        })
      ]
const externals = ssr => (ssr ? [nodeExternals()] : [])

const baseConfig = ssr => ({
  mode: devMode ? 'development' : 'production',
  entry: entry(ssr),
  output: {
    filename: output(ssr),
    chunkFilename: output(ssr),
    path: resolve(__dirname, 'build')
  },
  target: target(ssr),
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'postcss-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader',
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      { test: /\.html$/, exclude: /node_modules/, use: 'html-loader' },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: 'svg-sprite-loader'
          },
          {
            loader: 'svgo-loader',
            options: {
              externalConfig: 'svgo-config.yml'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': resolve(__dirname, 'src')
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolve(__dirname, 'tsconfig.json')
      })
    ]
  },
  externals: externals(ssr),
  plugins: [
    new Dotenv({
      path: devMode ? `development.env` : `production.env`,
      safe: false
    }),
    ...plugin(ssr)
  ]
})

module.exports = baseConfig

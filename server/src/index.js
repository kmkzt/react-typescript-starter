'use strict'

const express = require('express')
const server = express()
const reactDomServer = require('react-dom/server')
const app = require('./app.js')

const pageRender = rootComponent =>
  `
  <html>
    <div id="app">${rootComponent}</div>
  </html>
  `

server.get('*', (req, res) => {
  const reactEle = reactDomServer.renderToString(app())
  res.send(pageRender(reactEle))
})

if (process.env.NODE_ENV === 'development') {
  server.listen(3000)
  console.log('open http://localhost:3000')
} else {
  module.exports = server
}

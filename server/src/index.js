'use strict'

const express = require('express')
const app = express()
const { renderToString } = require('react-dom/server')
const client = require('./client.js')

app.get('*', (req, res) => {
  const reactEle = renderToString(client)
  res.send(reactEle)
})

if (process.env.NODE_ENV === 'development') {
  app.listen(3000)
  console.log('open localhost:3000')
} else {
  module.exports = app
}

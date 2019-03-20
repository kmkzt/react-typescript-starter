import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import { App } from '@/app'

const server = express()

const pageRender = (app: string) =>
  `
  <html>
    <div id="app">${app}</div>
  </html>
  `

server.get('*', (req, res) => {
  const reactEle: string = renderToString(<App />)
  res.send(pageRender(reactEle))
})

if (process.env.NODE_ENV === 'development') {
  server.listen(3000)
  console.log('open http://localhost:3000')
} else {
  module.exports = server
}

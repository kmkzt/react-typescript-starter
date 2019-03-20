import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { App } from '@/app'

const server = express()

const pageRender = (app: string) =>
  `
  <html>
    <div id="app">${app}</div>
  </html>
  `
const Page = () => (
  <Router history={createMemoryHistory()}>
    <App />
  </Router>
)

server.get('*', (req, res) => {
  const reactEle: string = renderToString(React.createElement(Page))
  res.send(pageRender(reactEle))
})

// if (process.env.NODE_ENV === 'development') {
server.listen(3000)
//   console.log('open http://localhost:3000')
// } else {
//   module.exports = server
// }

import React from 'react'
import ReactDOM from 'react-dom'
import { App } from '@/app'

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
  })
}

const app: HTMLElement = document.createElement('div')
document.body.appendChild(app)
ReactDOM.render(<App />, app)

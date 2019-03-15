import React from 'react'
import ReactDOM from 'react-dom'
import { App } from '@/app'
import loadingWorkbox from './workbox'

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', loadingWorkbox)
}

const app: HTMLElement | null = document.getElementById('app')
if (app) {
  ReactDOM.render(<App />, app)
}

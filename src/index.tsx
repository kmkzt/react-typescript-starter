import React from 'react'
import ReactDOM from 'react-dom'
import { App } from '@/app'
import serviceWorkerRegister from './workbox'

if (process.env.NODE_ENV === 'production') {
  serviceWorkerRegister()
}

const app: HTMLElement | null = document.getElementById('app')
if (app) {
  ReactDOM.render(<App />, app)
}

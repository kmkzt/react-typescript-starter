import 'workbox-sw'
import Workbox from 'workbox-sw'

export default () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', loadSW)
  }
}

const loadSW = async () => {
  const successAction = (register: any) => {
    // Registration was successful
    console.log(
      'ServiceWorker registration successful with scope: ',
      register.scope
    )
    checkWorkbox()
    register.pushManager.subscribe({ userVisibleOnly: true })
  }
  const errorAction = (err: any) => {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err)
  }
  navigator.serviceWorker.register('/sw.js').then(successAction, errorAction)
}

const checkWorkbox = () => {
  const getWorkbox = (): typeof Workbox | null => (self as any).workbox || null
  const workbox = getWorkbox()
  if (!workbox) {
    console.log(`Boo! Workbox didn't load! 😬`)
    return
  }
  console.log(`Yay! Workbox is loaded 🎉`)
}

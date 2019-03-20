import 'workbox-sw'
import Workbox from 'workbox-sw'

export default async () => {
  try {
    const getWorkbox = (): typeof Workbox | null =>
      (self as any).workbox || null
    const register: ServiceWorkerRegistration = await navigator.serviceWorker.register(
      '/js/sw.js'
    )
    register.pushManager.subscribe({ userVisibleOnly: true })
    const workbox = getWorkbox()
    if (!workbox) {
      console.log(`Boo! Workbox didn't load 😬`)
      return
    }
    console.log(`Yay! Workbox is loaded 🎉`)
  } catch (err) {
    console.log('SW registration failed: ', err)
  }
}

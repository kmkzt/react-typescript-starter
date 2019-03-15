import 'workbox-sw'
import Workbox from 'workbox-sw'
// import 'workbox-routing'
const getWorkbox = (): typeof Workbox | null => (self as any).workbox || null

export default async () => {
  try {
    const res = await navigator.serviceWorker.register('/sw.js')
    console.log('SW registration success: ', res)

    const workbox = getWorkbox()
    if (!workbox) {
      console.log(`Boo! Workbox didn't load 😬`)
      return
    }
    console.log(`Yay! Workbox is loaded 🎉`)
    // Force development builds >>> workbox.setConfig({ debug: true })
    // workbox.setConfig({ debug: false })
    // workbox.routing.registerRoute(
    //   new RegExp('\\.js$'),
    //   new workbox.strategies.CacheFirst() as any
    // )
  } catch (err) {
    console.log('SW registration failed: ', err)
  }
}

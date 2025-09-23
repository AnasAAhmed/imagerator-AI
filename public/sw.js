// ---- Caching Strategy ----
const CACHE_NAME = "pwa-cache-v1"
const urlsToCache = [
    "/",            // home
    "/favicon.ico", // favicon
    "/manifest.webmanifest",
    "/favicon-2.png",
    "/favicon-3.png",
]

// Install: cache important assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[ServiceWorker] Caching pre-cache assets")
            return cache.addAll(urlsToCache)
        })
    )
})

// Activate: cleanup old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("[ServiceWorker] Deleting old cache:", cache)
                        return caches.delete(cache)
                    }
                })
            )
        )
    )
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return

  if (request.headers.get("accept")?.includes("text/html")) {
    // Pages → Network first, update cache, fallback to cache
    event.respondWith(
      fetch(request)
        .then((res) => {
          const resClone = res.clone()
          caches.open("pages-cache").then((cache) => cache.put(request, resClone))
          return res
        })
        .catch(() => caches.match(request))
    )
  } else {
    // Static assets → Cache first, fallback to network
    event.respondWith(
      caches.match(request).then((cached) => {
        return (
          cached ||
          fetch(request).then((res) => {
            const resClone = res.clone()
            caches.open("static-cache").then((cache) => cache.put(request, resClone))
            return res
          })
        )
      })
    )
  }
})


// ---- Push Notifications ----
self.addEventListener("push", (event) => {
    if (event.data) {
        const data = event.data.json()
        const options = {
            body: data.body,
            icon: data.icon || "/favicon-2.png",
            badge: "/favicon-3.png",
            vibrate: [100, 50, 100],
            data: {
                url: data.url || "/", // Open on click
            },
        }
        event.waitUntil(
            self.registration.showNotification(data.title || "Notification", options)
        )
    }
})

self.addEventListener("notificationclick", (event) => {
    event.notification.close()
    event.waitUntil(
        clients.openWindow(event.notification.data.url || "/")
    )
})

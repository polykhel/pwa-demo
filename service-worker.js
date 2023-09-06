// only happens once, unless the service-worker is changed
self.addEventListener("install", (e) => {
  console.log("SW installed");

  e.waitUntil(
    caches.open("static").then(cache => {
        return cache.addAll(["./", "./manifest.json", "./icons/manifest-icon-512.maskable.png", "./favicon.ico"])
    })
  )
});
 

self.addEventListener('fetch', e => {
    // cache-first then network
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
})
const CACHE_NAME = 'krishi-kharch-v1';
const STATIC_ASSETS = [
  '.',
  'index.html',
  'manifest.json',
  'offline.html',
  'offline.css',
  'icons/icon-192x192.png',
  'icons/icon-512x512.png',
  'icons/splash-640x1136.png',
  'icons/splash-750x1334.png',
  'icons/splash-1242x2208.png',
  'icons/splash-1125x2436.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, falling back to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Return cached response
        }

        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses or non-GET requests
            if (!response || response.status !== 200 || event.request.method !== 'GET') {
              return response;
            }

            // Cache the new resource
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return response;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('offline.html');
            }
            
            // Return a placeholder image for image requests
            if (event.request.destination === 'image') {
              return new Response(
                '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#f0fdf4"/><text x="50" y="50" font-family="system-ui" font-size="12" fill="#166534" text-anchor="middle">Image Offline</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              );
            }
          });
      })
  );
}); 
// Service Worker for Animal Funimation
const CACHE_NAME = 'animal-funimation-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/app.js',
  '/styles.css',
  '/manifest.json',
  '/favicon.ico'
];

// Dynamic assets patterns to cache
const DYNAMIC_PATTERNS = [
  /\.(png|jpg|jpeg|gif|svg|wav|mp3|webp)$/i
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve cached content, cache new dynamic content
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Skip cross-origin requests (CDNs, external APIs, etc.)
  if (event.request.url.startsWith('http') && !event.request.url.startsWith(location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Fetch and cache dynamic assets
        return fetch(event.request).then(response => {
          // Don't cache non-200 responses
          if (!response || response.status !== 200) {
            return response;
          }

          // Check if this is a dynamic asset to cache
          const isDynamicAsset = DYNAMIC_PATTERNS.some(pattern => pattern.test(url.pathname));

          if (isDynamicAsset) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(event.request, responseClone);
            });
          }

          return response;
        });
      })
      .catch(() => {
        // Offline fallback - could return custom offline page
        console.log('Service Worker: Fetch failed, returning offline fallback');
        return new Response('Offline content not available', { status: 503, statusText: 'Service Unavailable' });
      })
  );
});

// Message event for cache management
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

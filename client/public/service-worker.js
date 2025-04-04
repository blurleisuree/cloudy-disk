const CACHE_NAME = "cloudy-disk-cache-v1";

const urlsToCache = [
  "/", 
  "/index.html",
  "/manifest.json",
  "/favicons/favicon-16x16.png",
  "/favicons/favicon-32x32.png",
  "/favicons/favicon-64x64.png",
  "/favicons/apple-touch-icon.png",
  "/favicons/favicon-192x192.png",
  "/favicons/favicon-512x512.png",
  "/screenshots/screenshot-narrow.png",
  "/screenshots/screenshot-wide.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
  // Принудительно активируем сервис-воркер сразу после установки
  self.skipWaiting();
});

// Активация сервис-воркера: удаляем старые кэши
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Принудительно захватываем контроль над страницей
  self.clients.claim();
});

// Перехват запросов: возвращаем кэшированные данные или загружаем из сети
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Если ресурс есть в кэше, возвращаем его
      if (response) {
        return response;
      }
      // Иначе делаем запрос в сеть
      return fetch(event.request).then((networkResponse) => {
        // Кэшируем новый ресурс (если это не API-запрос)
        if (
          !event.request.url.includes("/api/") &&
          networkResponse.status === 200
        ) {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      });
    })
  );
});
// Service Worker для «Запоминашки» — офлайн-работа
const CACHE_NAME = 'zapominki-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/matter.min.js',
  '/logo.png',
  '/logo2.png',
  '/screen.png',
  '/swipe.mp3',
  '/plastic.mp3',
  '/wall.mp3'
];

// Все 24 иконки
for (let i = 1; i <= 24; i++) {
  ASSETS.push(`/icon${i}.png`);
}

// Установка — кешируем все ресурсы
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Активация — удаляем старые кеши
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

// Стратегия: Cache First, fallback to Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((response) => {
        // Кешируем новые ресурсы на лету
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // Если нет сети и нет в кеше — возвращаем заглушку
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
        return new Response('', { status: 404 });
      });
    })
  );
});

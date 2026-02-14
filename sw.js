// Nombre de la memoria caché
const CACHE_NAME = 'glory-tetris-v1';

// Lista de archivos necesarios para que el juego funcione offline
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  '[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)',
  '[https://fonts.googleapis.com/css2?family=Outfit:wght@400;900&display=swap](https://fonts.googleapis.com/css2?family=Outfit:wght@400;900&display=swap)'
];

// Evento de instalación: guarda los archivos en la caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Evento de activación: limpia versiones antiguas de la caché (Mantenimiento automático)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Evento de recuperación (Fetch): sirve los archivos desde la caché si están disponibles
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna el archivo de la caché o realiza la petición a la red
      return response || fetch(event.request);
    })
  );
});

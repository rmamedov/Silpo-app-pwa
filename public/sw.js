/* Сільпо PWA — service worker: precache app shell, runtime cache-first for static assets */
const CACHE = 'silpo-v1';
const APP_SHELL = [
  '/',
  '/manifest.webmanifest',
  '/icons/icon.svg',
  '/assets/yezzz-mark.png',
  '/fonts/SilpoText-Regular.ttf',
  '/fonts/SilpoText-Medium.ttf',
  '/fonts/SilpoText-SemiBold.ttf',
  '/fonts/SilpoText-Bold.ttf',
  '/fonts/SilpoText-ExtraBold.ttf',
  '/fonts/SilpoText-Black.ttf',
  '/fonts/SilpoText-CaptionSemiBold.ttf',
  '/fonts/SilpoRounded-Bold.ttf',
  '/fonts/SilpoRounded-Black.ttf',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) return;

  // Navigation: network-first with offline fallback to cached shell
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('/', copy));
          return res;
        })
        .catch(() => caches.match('/'))
    );
    return;
  }

  // Static assets: cache-first, fill cache on miss
  e.respondWith(
    caches.match(request).then(
      (hit) =>
        hit ||
        fetch(request).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(request, copy));
          }
          return res;
        })
    )
  );
});

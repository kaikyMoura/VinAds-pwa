var cacheName = 'pwaTeste+-v1.2';

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads!
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener('activate', (event) => {
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([

        '/index.html',
        
        '/assets/sass/libs/_breakpoints.scss',
        
        '/assets/sass/libs/_functions.scss',
        
        '/assets/sass/libs/_html-grid.scss',
        
        '/assets/sass/libs/_mixins.scss',
        
        '/assets/sass/libs/_vars.scss',
        
        'assets/sass/libs/_vendor.scss',
        
        'assets/sass/main.scss',
        
        'assets/webfonts',
        
        '/assets/css/fontawesome-all.min.css',
        
        '/assets/css/main.css'
        
        '/assets/css/images/bg01.png',

        '/assets/js/breakpoint.min.js',

        '/assets/js/browser.min.js',

        '/assets/js/jquery.dropdown.min.js',

        '/assets/js/jquery.min.js',

        '/assets/js/main.js',

        '/assets/js/util.js',

        '/assets/images/bg01.png',
        '/images/logo01.png',
        '/images/image01.png',
        '/images/image02.png',
        '/images/image03.png',
        '/images/image04.png',
        '/images/image05.png',
        '/images/image06.png',
        '/images/image07.png',
        '/icon-192x192.png',
        '/icon-256x256.png',
        '/icon-384x384.png',
        '/icon-512x512.png',
      ]))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  //Atualizacao internet
  event.respondWith(async function () {
     try {
       return await fetch(event.request);
     } catch (err) {
       return caches.match(event.request);
     }
   }());

   //Atualizacao cache
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

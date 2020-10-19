importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
   console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(
   [
      {url: '/navbar.html', revision: '1'},
      {url: '/index.html', revision: '1'},
      {url: '/detail-team.html', revision: '1'},
      {url: '/manifest.json', revision: '1'},
      {url: '/img/icon-192.png', revision: '1'},
      {url: '/img/icon-512.png', revision: '1'},
      {url: '/pages/team.html', revision: '1'},
      {url: '/pages/standing.html', revision: '1'},
      {url: '/pages/scorers.html', revision: '1'},
      {url: '/pages/saved.html', revision: '1'},
      {url: '/css/materialize.min.css', revision: '1'},
      {url: '/css/style.css', revision: '1'},
      {url: '/js/materialize.min.js', revision: '1'},
      {url: '/js/navbar.js', revision: '1'},
      {url: '/js/api.js', revision: '1'},
      {url: '/js/db.js', revision: '1'},
      {url: '/js/idb.js', revision: '1'},
      { url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js', revision: '1' },
      { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
      { url: 'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
   ], {
      ignoreUrlParametersMatching : [/.*/] 
   }
);

workbox.routing.registerRoute(
   new RegExp('/css/'),
      workbox.strategies.cacheFirst({
         cacheName: 'styles'
      })
);

workbox.routing.registerRoute(
   new RegExp('/js/'),
      workbox.strategies.cacheFirst({
         cacheName: 'javascript'
      })
);

workbox.routing.registerRoute(
   /\.(?:png|gif|jpg|jpeg|svg)$/,
   workbox.strategies.cacheFirst({
      plugins: [
         new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60
         }),
     ],
   })
);

workbox.routing.registerRoute(
   new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
         cacheName: 'pages'
      })
);

workbox.routing.registerRoute(
   new RegExp('https://api.football-data.org/v2/'),
      workbox.strategies.networkFirst({
         networkTimeoutSeconds: 3,
         cacheName: 'football-api'
      })
);

self.addEventListener('push', (event) => {
   let body;

   if (event.data) {
      body = event.data.text();
   } else {
      body = 'Push message no payload';
   }

   let options = {
      body: body,
      icon: 'img/notification.png',
      vibrate: [100, 50, 100],
      data: {
         dateOfArrival: Date.now(),
         primaryKey: 1
      }
   };

   event.waitUntil(
      self.registration.showNotification('Push Notification', options)
   );
});
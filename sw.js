/*Help found to build this up  https://developers.google.com/web/fundamentals/primers/service-workers and the udacity lessons*/


const staticCacheName = 'restaurant-cache-v1';
const toCache = [
  '/',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './css/responsive.css',
  './data/restaurants.json',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
];
//Opens cache and adds the resource
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(staticCacheName)
    .then((cache) => {
      console.log("the cache is open");
      return cache.addAll(toCache);
    }).catch((err) => console.log("Error installing", err))
  );
});
//Fetch service worker
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(staticCacheName)
        .then((cache)  => {
            return cache.match(event.request)
            .then((response)  => {
                return response || fetch(event.request)
                .then((response) => {
                  let responseCopy = response.clone();
                    cache.put(event.request, responseCopy);
                    return response;

                    if(event.request.url===googleMapsAPI){
    event.respondWith(
      fetch( 
        googleMapsAPI +"&" + Date.now(), 
            { mode: "no-cors", cache: "no-store" } 
          ))
}
                });
            });
        })
    );
});
//Activates the service worker
self.addEventListener('activate', (event) => {
  let cacheWhiteList = ['restaurant-cache-v1'];
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheWhiteList.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') {
       self.skipWaiting();
    }
});


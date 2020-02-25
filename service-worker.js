const CACHE_NAME = 'lokawisata-1.3';
var urlsToCache = [
	"/",
	"/index.html",
	"/manifest.json",
	"/css/materialize.min.css",
	"/css/style.css",
	"/img/favicon.png",
	"/img/img-1.jpg",
	"/img/img-2.jpg",
	"/img/img-3.jpg",
	"/img/img-4.jpg",
	"/img/img-5.jpg",
	"/img/img-6.jpg",
	"/img/img-7.jpg",
	"/img/img-8.jpg",
	"/img/img-9.jpg",
	"/img/img-10.jpg",
	"/img/logo.png",
	"/js/materialize.min.js",
	"/js/script.js",
	"/pages/amusement-park.html",
	"/pages/contact.html",
	"/pages/home.html",
	"/pages/religious-tourism.html",
	"/pages/tourist-attraction.html",
	"/webfont/MaterialIcons-Regular.woff2"
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches
			.match(event.request, { cacheName: CACHE_NAME})
			.then(function(response) {
				if (response) {
					console.log('Serviceworker: Gunakan aset dari cache: ', response.url);
					return response;
				}

				console.log('Serviceworker: Memuat aset dari server: ', event.request.url);

				return fetch(event.request);
			})
	);
})

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if (cacheName != CACHE_NAME) {
						console.log('Serviceworker: cache ' + cacheName + ' dihapus');
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
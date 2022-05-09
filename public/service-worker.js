self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
  });

  
self.addEventListener('push', e=>{
   
    const data = e.data.json();
    e.waitUntil(
        self.registration.showNotification(data.title, {
            body:data.body,
            image:data.image,
            icon:data.icon,
            data:{
                url:data.data.url
            }
        })
    );
    console.log('data from server',e,e.data);
 })
 self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notification click Received.', event);
    event.notification.close();
  
    const launchUrl = event.action || event.notification.data.url;
  
    if (launchUrl) {
      event.waitUntil(clients.openWindow(launchUrl));
    }
   });




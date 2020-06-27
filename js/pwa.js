'use strict';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/xr-shop/service-worker.js',
    {scope: '/xr-shop/'}
  )
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  })
  .catch(function(error) {
    console.log('Service worker registration failed, error:', error);
  });
}

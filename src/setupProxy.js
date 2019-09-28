const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  // ...You can now register proxies as you wish!
  app.use(proxy('/login', {
    target: "http://119.90.248.34:51029/",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
     "/login": "/login"
    },
   }));
   app.use(proxy('/wTimeData', {
    target: 'http://172.19.5.34:9531',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
     "/wTimeData": "/wTimeData"
    },
   }));
  //app.use(proxy('/apc', { target: 'http://172.19.5.34:9531' }));
};

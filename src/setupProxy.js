const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  // ...You can now register proxies as you wish!
  app.use(proxy('/wTimeData', {
    target: "http://119.90.248.34:51029/",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
     "^/wTimeData": "/wTimeData"
    },
   }));
   app.use(proxy('/wInfo', {
    target: "http://119.90.248.34:51029/",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
     "^/wInfo": "/wInfo"
    },
   }));
   app.use(proxy('/api', {
    target: "http://39.98.215.185:8088/",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
     "^/api": "/api"
    },
   }));

  // app.use(proxy('/wTimeData', { target: "http://119.90.248.34:51029/" }));
  // app.use(proxy('/wInfo', { target: "http://119.90.248.34:51029/" }));
  // app.use(proxy('/api', { target: "http://39.98.215.185:8088/" }));
};

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  // ...You can now register proxies as you wish!
  // app.use(proxy('/api', {
  //   target: 'http://172.19.5.35:9536',
  //   secure: false,
  //   changeOrigin: true,
  //   pathRewrite: {
  //    "^/api": "/"
  //   },
  //  }));
  //  app.use(proxy('/apc', {
  //   target: 'http://172.19.5.34:9531',
  //   secure: false,
  //   changeOrigin: true,
  //   pathRewrite: {
  //    "^/apc": "/"
  //   },
  //  }));

  app.use(proxy('/wTimeData', { target: "http://119.90.248.34:51029/" }));
  app.use(proxy('/wInfo', { target: "http://119.90.248.34:51029/" }));
  app.use(proxy('/api', { target: "http://39.98.215.185:8088/" }));
};

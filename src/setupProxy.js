const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  // ...You can now register proxies as you wish!

  app.use(proxy('/login', { target: "http://119.90.248.34:51029/"}));
  app.use(proxy('/wTimeData', { target: "http://119.90.248.34:51029/"}));
};

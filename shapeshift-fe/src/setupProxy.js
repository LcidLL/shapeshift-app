const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000', // Change if your Rails backend runs on a different port
      changeOrigin: true,
    })
  );
};

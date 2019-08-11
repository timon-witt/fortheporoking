const proxy = require('http-proxy-middleware');

/**
 * See setupProxy.js documentation:
 * https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually
 * 
 * local react-script server would route all routes to /index.html. 
 * In this file we define a custom rule for the netlify functions route.
 * (only needed for local development)
 */

module.exports = function(app) {
  app.use(proxy('/.netlify/functions/', { 
    target: 'http://localhost:9000/',
    "pathRewrite": {
      "^/\\.netlify/functions": ""
    }
  }));
};

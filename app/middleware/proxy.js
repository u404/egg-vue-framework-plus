'use strict';

const httpProxy = require('http-proxy');

function proxyMiddleware({ prefix, target, events }) {

  if (!prefix || !target) {
    return (ctx, next) => next();
  }

  const proxyServer = httpProxy.createProxyServer({});

  if (typeof target === 'string') {
    target = {
      target,
    };
  }

  if (typeof prefix === 'string') {
    prefix = [ prefix ];
  }

  if (events) {
    Object.keys(events).forEach(key => {
      const fn = events[key];
      if (typeof fn === 'function') {
        proxyServer.on(key, fn);
      }
    });
  }

  return (ctx, next) => {
    if (prefix.some(p => ctx.originalUrl.indexOf(p) === 0)) {
      proxyServer.web(ctx.req, ctx.res, target);
      ctx.respond = false;
    } else {
      return next();
    }
  };

}


module.exports = proxyMiddleware;

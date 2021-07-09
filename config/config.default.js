'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {};

  /**
   * some description
   * @member Config#test
   * @property {String} key - some description
   */
  config.test = {
    key: appInfo.name + '_123456',
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    root: [
      path.join(appInfo.baseDir, 'app/view'),
    ].join(','),
    cache: appInfo.env !== 'local',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cluster = {
    listen: {
      path: '',
      port: 8001,
      hostname: '0.0.0.0',
    },
  };

  config.development = {
    reloadPattern: [ '**', '!**/web/**/*.*' ],
  };

  config.devServer = appInfo.env === 'local' && {
    port: 8002,
  };

  config.web = {
    static: '/resource',
    path: path.join(appInfo.baseDir, 'app/web'),
    distPath: path.join(appInfo.baseDir, 'app/web/dist'),
    manifest: appInfo.env !== 'local' && require(path.join(appInfo.baseDir, 'app/web/dist/manifest')),
  };

  config.proxy = appInfo.env === 'local' ? {
    prefix: [ '/@fs' ],
    target: `http://localhost:${config.devServer.port}`,
  } : {};

  config.static = appInfo.env === 'local' ? {
    prefix: '/',
    dir: config.web.path,
  } : {
    prefix: '/',
    dir: config.web.distPath,
  };

  return config;
};

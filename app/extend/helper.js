
'use strict';
// const path = require('path');

module.exports = {

  renderHeadContent() {
    const { config } = this.app;
    if (config.env === 'local') {
      return '';
    }
    return `<link rel="stylesheet" href="${config.web.manifest['src/main.js'].css}" />`;
  },

  renderBodyContent() {
    const { config } = this.app;
    if (config.env === 'local') {
      return `<script type="module" src="http://localhost:${config.devServer.port}/@vite/client"></script>
              <script type="module" src="http://localhost:${config.devServer.port}/src/main.js"></script>`;
    }
    return `<script type="module" src="${config.web.manifest['src/main.js'].file}"></script>`;
  },

};

'use strict';

const path = require('path');
const spawn = require('cross-spawn');

const cwd = process.cwd();

const context = path.resolve(cwd, 'app/web');

spawn('vite', [ 'build' ], {
  stdio: [ 'inherit', 'pipe', 'inherit' ],
  env: {
  },
  cwd: context,
});

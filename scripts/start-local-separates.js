process.env.NODE_ENV = 'local-separates';
require('babel-register');
require('../src/server-api-only.js');
require('../src/server-ui-only.js');
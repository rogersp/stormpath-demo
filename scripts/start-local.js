process.env.NODE_ENV = 'local';
require('babel-register');
require('../src/server.js');
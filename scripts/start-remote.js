process.env.NODE_ENV = 'remote';
require('babel-register');
require('../src/server.js');
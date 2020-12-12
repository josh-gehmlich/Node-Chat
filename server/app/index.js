const express = require('express');
const bodyParser = require('body-parser');

module.exports = server => {
  const app = express();

  app.use(require('compression')());
  app.use(require('morgan')('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
  app.disable('x-powered-by');

  require('./routes')(app);

  server.on('request', app);
};
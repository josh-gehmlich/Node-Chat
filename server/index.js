const http = require('http');

/* LOAD ENVIRONMENT VARIABLES */
require('dotenv').config();

/* SET UP SERVER */
const server = http.createServer();
require('./app')(server);
require('./websockets')(server);

/* START SERVER */
server.listen(process.env.PORT || 3001, () => {
  console.log(`Server started on port ${server.address().port}`);
});
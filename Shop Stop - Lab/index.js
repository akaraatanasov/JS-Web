const express = require('express');
const port = 4319;
const config = require('./config/config');
const database = require('./config/database.config');

let app = express();
let environment = process.env.NODE_ENV || 'development';

database(config[environment]);
require('./config/express')(app, config[environment]);
require('./config/routes')(app);
require('./config/passport')();

app.listen(port);

console.log(`Server listening on ${port}`);
require('dotenv').config();
require('express-async-errors');

const express =  require('express');
const winston = require('winston');
const app = express();
const port = process.env.PORT || 8000;
console.log(process.env.NODE_ENV);

//Startup Code
require('./startup/middlewares')(app);
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();

app.listen(port, () => {
    console.log(port);
    winston.info(`App is running at port: ${port}`);
})
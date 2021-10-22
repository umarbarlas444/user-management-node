
const express = require('express')
const helmet = require('helmet');
const headers = require('../middlewares/header');

module.exports = function(app){
    app.use(express.json());
    
    app.use(helmet());
    
    app.use(headers);
}

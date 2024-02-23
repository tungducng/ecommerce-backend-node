const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');

const app = express();

//init middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))
//init db
require('./configs/config.mongose');
// const {checkOverload} = require('./helpers/check.connect');
// checkOverload();

// init routes
app.use('', require('./routes'))
//init handle error

module.exports = app;

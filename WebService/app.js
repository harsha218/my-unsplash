const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./Routes/Router.js');
const { notFound, errorHandler } = require('./Middleware/ErrorMiddleware.js');
require('dotenv').config();
require('./DBConfig/db.js')();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

app.use('/', router);

app.use(notFound, errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Listening to port - ${port}`));
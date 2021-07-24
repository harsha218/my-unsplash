const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./Routes/Router.js');
const { notFound, errorHandler } = require('./Middleware/ErrorMiddleware.js');
require('dotenv').config();
require('./dbConfig.js')();

const app = express();

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

app.use('/', router);

app.use(notFound, errorHandler);

const port = process.env.PORT || 8080;

app.listen(port, ()=> console.log(`Listening to port - ${port}`));
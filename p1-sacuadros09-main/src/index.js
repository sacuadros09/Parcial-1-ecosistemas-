const express = require('express');
const cors = require('cors');
const app = express();

const carRouter = require('./router/cars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/cars', carRouter);

module.exports = app;
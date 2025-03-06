const express = require('express');
const app = express();


require('./src/app/cors')(app);


app.use(express.json());


const consumerUnitEconomiesController = require('./src/app/controllers/consumerUnitEconomiesController');
app.use('/', consumerUnitEconomiesController);

module.exports = app;

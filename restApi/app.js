const express = require('express')
const app = express();

const buildingRoutes = require('./api/routes/builds');
const siteRoutes = require('./api/routes/sites');
const levelRoutes = require('./api/routes/levels');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/builds', buildingRoutes);
app.use('/sites', siteRoutes);
app.use('/levels', levelRoutes);

module.exports = app;

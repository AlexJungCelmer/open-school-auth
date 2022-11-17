const express = require('express');
const app = express();

//Rotas
const index = require('./routes/index');
const user = require('./routes/user');
const school = require('./routes/school');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', index);
app.use('/user', user);
app.use('/school', school);

module.exports = app;
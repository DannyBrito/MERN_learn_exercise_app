// 'require/import express,cors,mongoose' & enable env variables
const express = require('express');
const cors =  require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const exercisesRouter =  require('./routes/exercises');
const usersRouter =  require('./routes/users');

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);

module.exports = app
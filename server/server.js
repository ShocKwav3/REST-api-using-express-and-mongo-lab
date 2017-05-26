import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import index from './controller';
import dbConfig from './config/database';
const app = express();
//due to webpack bug
const ejs = require('ejs').__express;
let port = process.env.PORT || 3000;

//connection to database
mongoose.connect(dbConfig.url);
mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', () => {
    console.log("Connected to MongoDB");
  });
//for logging information
app.use(logger('dev'));
//to make available the body of incoming request for access
app.use(bodyParser.json());
//serving static files (css, js, images etc)
app.use(express.static(path.join(__dirname, '..', 'public')));
//setting views
app.set('views', path.join(__dirname, '..', 'views'));
//setting templating engine
app.set('view engine', 'ejs');
//due to a bug of webpack do this
app.engine('.ejs', ejs);
//setting up corresponding routes
app.use('/', index);
//handle error
app.use((err, req, res, next) => {
  res.send({error: err});
});


/*
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname,'..') + '/views/index.html');
});
*/

module.exports = { app, port };
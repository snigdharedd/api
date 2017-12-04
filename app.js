const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var secret = 'swethareddy56';

mongoose.connect('mongodb://localhost/monpost');

let db=mongoose.connection;

db.once('open',function(){
  console.log("connected to db");
});

db.on('error',function(err){
  console.log(err);
});

let User = require('./models/user');

const app=express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')))

let users = require('./routes/users');
app.use('/users',users);



app.listen(3000,function(){
  console.log('connected to server');
})

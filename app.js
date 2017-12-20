const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const session= require('express-session');
const passport= require('passport');




mongoose.connect('mongodb://localhost/monpost');

let db=mongoose.connection;

db.once('open',function(){
  console.log("connected to db");
});

db.on('error',function(err){
  console.log(err);
});

let User = require('./schema/user');

const app=express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname,'public')))

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());




var users= require('./routes/users');
app.use('/users',users);

app.get('/index',function(req,res){
    res.render('index.ejs',{

    })
})

app.get('/profile',isLoggedIn,function(req, res) {
    res.render('profile.ejs', {
        user : req.user 
    });
});


function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())
            return next();
        res.redirect('/index');
    }

app.listen(3000,function(){
  console.log('connected to server');
})

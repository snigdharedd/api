const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var secret = 'swethareddy56';
let User = require('../models/user');

router.get('/register',function(req,res){
  res.render('register')
})

router.post('/register',function(req,res){
  const id= req.body.id;
  const email= req.body.email;
  const phoneno= req.body.phoneno;
  const role= req.body.role;
  const firstname= req.body.firstname;
  const lastname= req.body.lastname;
  const password= req.body.password;

  let newuser = new User();
  newuser.id= id;
  newuser.email= email;
  newuser.phoneno= phoneno;
  newuser.role= role;
  newuser.firstname= firstname;
  newuser.lastname= lastname;
  newuser.password= password;
  User.findOne({$or: [
    {'email':email},
    {'phoneno': phoneno}
]},function(err,user){
    if(err){
      console.log('error')
    }
    if(user){
      res.json('email or phoneno is already taken');
    }
    bcrypt.genSalt(10,function(err,salt){
      bcrypt.hash(newuser.password,salt,function(err,hash){
        if(err){
          console.log('err');
        }
        newuser.password=hash;

        newuser.save(function(err){
          if(err){
            console.log('err')
          }else{
            res.send(user);
          }
    })
  })
})
})
})

    router.get('/login',function(req,res){
    res.render('login');
})

router.post('/login',function(req,res){
  var email = req.body.email;
  var phoneno = req.body.phoneno;
  var password = req.body.password;
  User.findOne({$or: [
    {'email':email},
    {'phoneno':phoneno}
  ]},function(err,user){
    if(!user){
      res.json('email or phoneno is wrong')
    }
    else if(user){
      bcrypt.compare(password,user.password,function(err,user){
        if(err){
          console.log('err')
        }if(!user){
          res.json('wrong password')
        }else{
          var token = jwt.sign({email:user.email,phoneno:user.phoneno},secret,{expiresIn : 45000})
          res.json({user,token:token})
        }
      })
    }
  })
})


module.exports=router;

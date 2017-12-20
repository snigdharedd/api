const express = require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const config = require('../config');
const verifyToken = require('./VerifyToken');
const path= require('path');
const passport= require('passport');
const FacebookStrategy= require('passport-facebook').Strategy;
let User = require('../schema/user');

router.get('/register',function(req,res){
  User.find({},function(err,users){
    return res.json(users);
  })

})

router.post('/register',function(req,res){
  const ID = req.body.ID;
  const email= req.body.email;
  const phoneno= req.body.phoneno;
  const role= req.body.role;
  const firstname= req.body.firstname;
  const lastname= req.body.lastname;
  const password= req.body.password;

  let newuser = new User();
  newuser.ID = ID;
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





router.post('/login',function(req,res){
  var email = req.body.email;
  var password = req.body.password;
  var phoneno= req.body.phoneno;

    User.findOne({$or: [
    {'email':email},
    {'phoneno':phoneno}
  ]},function(err,user){
    if(!user){
      res.json('email or phoneno is wrong')
    }
    else if(user){
      bcrypt.compare(password,user.password,function(err,result){
        if(!result){
          res.json('wrong password')
        }else{
          const token = JWT.sign( {id:user._id},config.secret);
          return res.send({user:true,token:token})
        }

      })
    }

  })
 })



router.get('/auth/facebook',passport.authenticate('facebook', {scope:['public_profile','email']}))
 router.get('/auth/facebook/callback',function(req,res,next){
   passport.authenticate('facebook',{
   successRedirect: '/profile',
   failureRedirect: '/index'
 })(req,res,next)
})





  router.get('/getusers',verifyToken,function(req,res){

          User.findById(req.userId,function(err,user){
            res.send(user);
          })
        })

      router.put('/update',verifyToken,function(req,res){
        User.findByIdAndUpdate(req.userId,{firstname:req.body.firstname,lastname:req.body.lastname},function(user){
          return res.send(user)
          })
        })

module.exports=router;

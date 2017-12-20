var passport= require('passport');
var FacebookStrategy= require('passport-facebook').Strategy;
var configAuth= require('./auth');
var path= require('path');
var User= require('../schema/user');

module.exports=function(passport){
  passport.serializeUser(function(user, done) {
        done(null, user.id);
    });


    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
  },
  function(token, refreshToken, profile, done){
    process.nextTick(function(){
      User.findOne( {'facebook.id' : profile.id }, function(err,user){
        if(err)
         return done(err);
        if(user){
          return done(null,user);
        }else{
          var newuser= new User();
          newuser.facebook.id= profile.id;
          newuser.facebook.token= token;
          newuser.facebook.email= profile.email;
          newuser.facebook.name= profile.name.givenName+''+profile.name.familyName;
          newuser.save(function(err){
            if(err)
              throw err;

            return done(null,newuser);
          })
        }
      })
    })
  }

))
}

module.exports= {
  "facebookAuth":{
    "clientID": "1972792076316486",
    "clientSecret": "3018f8151f2e8a2e5f94ddc6acb004d9",
    "callbackURL": "http://localhost:3000/auth/facebook/callback",
    'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
    'profileFields' : ['id', 'email', 'name'] 
  }
}

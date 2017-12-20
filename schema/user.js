let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
ID:{
    type:Number,
    required:true
  },
email:{
    type: String,
    required: true
  },
  phoneno:{
    type: Number,
    required: true
  },
  role:{
    type: String,
    required: true
  },
  firstname:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  facebook:{
    id: String,
    token: String,
    email: String,
    name: String
  }

}
);

let User = module.exports=mongoose.model('User',userSchema);

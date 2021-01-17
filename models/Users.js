const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname:{
    type:String
  },
  lastname:{
    type:String
  },
  email:{
    type:String,
    unique:true
    
  },
  password:{
    type:String,
    minlength:6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserDetails', UserSchema);
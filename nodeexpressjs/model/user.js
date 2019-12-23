/**
 * User Schema
 */
var bcrypt = require('bcrypt');
var mongoose = require('mongoose'),
  UserSchema = new mongoose.Schema({
    fullName: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true
    },
    hash_password: {
      type: String
    },
    created: {
      type: Date,
      default: Date.now
    }
  });
  
  UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };
  var userModel = mongoose.model('users', UserSchema);
  module.exports=userModel;
//   module.exports = ;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    displayName: {
      type: String,
      unique: true
    },
    profilePicture: {
      type: String
    },
    dateOfBirth: {
      type: Date
    },
    interests: {
      type: Array
    },
    location: {
      type: String
    },
    followers: [
      {
        type: Schema.ObjectId,
        ref: "User"
      }
    ],
    following: [
      {
        type: Schema.ObjectId,
        ref: "User"
      }
    ],
    lastLogin: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

UserSchema.pre('save', function(next) {
    // check if document is new or anew password has been set
    if(this.isNew || this.isModified('password')){
        //saving reference to this because of changing scopes
        const document = this;
        document.displayName = this.email;
        bcrypt.hash(document.password, 10 ,function(err, hashedPassword) {
            if(err) {
                return next(err);
            }else{
                document.password = hashedPassword;
                return next();
            }
        });
    } else{
        return next();
    }
 });
 
//  UserSchema.methods.isCorrectedPassword = function(password) {
//      return 
//  };
 

module.exports = mongoose.model("User", UserSchema);

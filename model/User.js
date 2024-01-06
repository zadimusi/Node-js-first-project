const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "can't be blank"], 
    },
    email: {
      type: String,
      unique: [true, "can't be duplicate"],
      index: true,
      lowercase: true,
      required: [true, "can't be blank"], 
      match: [/\S+@\S+\.\S+/, 'is invalid'],    
    },
    image: {
      type: String,
    }
  },
  { timestamps: true }
);

UserSchema.statics.getAllUsers = function () {
  return this.find({});
};

UserSchema.methods.getFullName = function () {
  return `${this.username}`;
};

UserSchema.methods.store = async function (data , file, next) {
  try {
    let fileName = '';
    console.log(file)
    if(!file){
      return { status: 412, message: 'The image field is required.' };
      
   }else{
    fileName = file.filename
    const savedUser = await this.model('User').create({...data, image : fileName});
    return savedUser;
   }
   
  } catch (error) {
     next(error)
  }
};

module.exports = mongoose.model('User', UserSchema);

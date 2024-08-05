import mongoose  from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required : true, unique: true},
  email: {type: String, required: true, unique: true},
  phone: {type: String, required: true},
  password: {type: String, required: true},
  confirm_password:{type: String, required: true},
  gender: {type: String, required: true}
});

const UserModel = mongoose.model("users", UserSchema);
export {UserModel as User}
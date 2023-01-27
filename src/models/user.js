import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstname: String,
  age: Number,
  direction:  String,
  telephone: String,
  avatar: String,
});

const User = mongoose.model("User", userSchema);

export { User };

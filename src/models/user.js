import mongoose from "mongoose";

const UserCollection = 'users';

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: String,
    name: String,
    age: Number,
    direction:  String,
    telephone: String,
    avatar: String,
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
  },
  { virtuals: true }
);

UserSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response.__v;
    delete response._id;
    return response;
  },
});

export const UserModel = { UserCollection, UserSchema };

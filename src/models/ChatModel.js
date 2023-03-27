import { Schema } from "mongoose";

const CartCollection = "chat";

const CartSchema = new Schema(
  {
		messages: String,
    timestamp: { type: String, required: true, max: 100 },
  },
  {
    virtuals: true,
  }
);

CartSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    return response;
  },
});

export const CartModel = { CartCollection, CartSchema };

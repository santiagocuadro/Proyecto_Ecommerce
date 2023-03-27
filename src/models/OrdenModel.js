import { Schema } from "mongoose";

const OrdenCollection = "orden";

const OrdenSchema = new Schema(
  {
    timestamp: { type: String, required: true, max: 100 },
    products: [{ 
      type: Schema.Types.ObjectId,
      ref: "products",
    }],
    estado: { type: String, default: 'generada'},
    emailDestino: String
  },
  {
    virtuals: true,
  }
);

OrdenSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    return response;
  },
});

export const OrdenModel = { OrdenCollection, OrdenSchema };

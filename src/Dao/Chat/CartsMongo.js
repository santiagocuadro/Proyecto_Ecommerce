import { MongoDBContainer } from "../../Containers/index.js";
import { ChatModel } from "../../models/index.js";

export class ChatMongo extends MongoDBContainer {
  constructor() {
    super({
      name: ChatModel.CartCollection,
      schema: ChatModel.CartSchema,
    });
  }

  async getById(id) {
    const response = await this.model.findById(id).populate("products").lean();

    return response;
  }
}

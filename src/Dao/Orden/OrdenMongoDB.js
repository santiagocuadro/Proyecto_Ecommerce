import { MongoDBContainer } from "../../Containers/index.js";
import { OrdenModel } from "../../models/index.js";

export class OrdenMongo extends MongoDBContainer {
  constructor() {
    super({
      name: OrdenModel.OrdenCollection,
      schema: OrdenModel.OrdenSchema,
    });
  }
}

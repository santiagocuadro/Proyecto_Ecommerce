import { config } from "../config/index.js";
import { MongoDBService } from "../services/index.js";
import { CartsMongo, CartsFilesystem, CartsMemory } from "./Cart/index.js";
import { ProductsMongo, ProductsFilesystem, ProductsMemory } from "./Products/index.js";

const getSelectedDaos = () => {
  switch (config.SERVER.SELECTED_DATABASE) {
    case "mongo": {
      MongoDBService.init();
      return {
        ProductDao: new ProductsMongo(),
        CartDao: new CartsMongo(),
      };
    }
    case "filesystem": {
      return {
        ProductDao: new ProductsFilesystem(),
        CartDao: new CartsFilesystem(),
      };
    }
    case "memory": {
      return {
        ProductDao: new ProductsMemory(),
        CartDao: new CartsMemory(),
      };
    }
  }
};

const { ProductDao, CartDao } = getSelectedDaos();

export { ProductDao, CartDao };

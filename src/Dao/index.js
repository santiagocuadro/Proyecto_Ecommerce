import { config } from "../config/index.js";
import { MongoDBService } from "../services/index.js";
import { CartsMongo, CartsFilesystem, CartsMemory } from "./Cart/index.js";
import { ProductsMongo, ProductsFilesystem, ProductsMemory } from "./Products/index.js";
import { OrdenMongo, OrdenFilesystem, OrdenMemory} from "./Orden/index.js";
import { UsersMongo } from './Users/index.js';

const getSelectedDaos = () => {
  switch (config.SERVER.SELECTED_DATABASE) {
    case "mongo": {
      MongoDBService.init();
      return {
        ProductDao: new ProductsMongo(),
        CartDao: new CartsMongo(),
        UserDao: new UsersMongo(),
        OrdenDao: new OrdenMongo()
      };
    }
    case "filesystem": {
      return {
        ProductDao: new ProductsFilesystem(),
        CartDao: new CartsFilesystem(),
        UserDao: new UsersMongo(),
        OrdenDao: new OrdenFilesystem()
      };
    }
    case "memory": {
      return {
        ProductDao: new ProductsMemory(),
        CartDao: new CartsMemory(),
        UserDao: new UsersMongo(),
        OrdenDao: new OrdenMemory()
      };
    }
  }
};

const { ProductDao, CartDao, UserDao, OrdenDao } = getSelectedDaos();

export { ProductDao, CartDao, UserDao, OrdenDao };

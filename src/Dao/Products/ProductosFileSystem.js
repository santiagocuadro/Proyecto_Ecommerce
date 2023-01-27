import { ContainerFileSystem } from "../../containers/ContainerFileSystem.js";
import { config } from "../../config/index.js";

export class ProductsFilesystem extends ContainerFileSystem {
  constructor() {
    super(config.DATABASES.filesystem.PRODUCTS_FILENAME);
  }
}

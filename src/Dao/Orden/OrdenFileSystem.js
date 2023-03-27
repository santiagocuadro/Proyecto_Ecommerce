import { ContainerFileSystem } from "../../containers/ContainerFileSystem.js";
import { config } from "../../config/index.js";

export class OrdenFilesystem extends ContainerFileSystem {
  constructor() {
    super(config.DATABASES.filesystem.ORDEN_FILENAME);
  }
}

import { ContainerFileSystem } from "../../containers/index.js";
import { config } from "../../config/index.js";

export class ChatFilesystem extends ContainerFileSystem {
  constructor() {
    super(config.DATABASES.filesystem.CHAT_FILENAME);
  }
}

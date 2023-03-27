import dotenv from 'dotenv';
dotenv.config();

const PRODUCTS_FILENAME = "products";
const CARTS_FILENAME = "carts";
const CHAT_FILENAME = "chat";

const config = {
  SERVER: {
    PORT: process.env.PORT || 8080,
    SELECTED_DATABASE: process.env.SELECTED_DB ?? "memory",
    CLIENT: {
      
    }
  },
  DATABASES: {
    filesystem: {
      PRODUCTS_FILENAME,
      CARTS_FILENAME,
      CHAT_FILENAME
    },
    mongo: {
      url: process.env.MONGO_DB_URL,
      dbName: process.env.MONGO_DB_NAME,
    },
  },
  EMAIL: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.EMAIL_PASSWORD
  },
  WPP: {
    SID: process.env.WPP_SID,
    PASS: process.env.WPP_PASS,
  },
  ADMIN_NUMBER: process.env.ADMIN_NUMBER,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  CLUSTER: process.env.CLUSTER,
};

export { config };

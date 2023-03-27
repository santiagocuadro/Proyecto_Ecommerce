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
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  WPP: {
    SID: process.env.WPP_SID,
    PASS: process.env.WPP_PASS,
    NUMBER: process.env.WPP_NUMBER
  },
  ADMIN_NUMBER: process.env.ADMIN_NUMBER,
  CLUSTER: process.env.CLUSTER,
};

export { config };

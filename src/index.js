import express from "express";
import passport from 'passport';
import session from "express-session";
// import { Strategy as LocalStrategy } from 'passport-local';
// import * as strategy from './middlewares/strategy.js';
import {engine} from 'express-handlebars';
import { routerProducts, routerCarrito, routerSession } from "./Routes/index.js";
import { config } from './config/index.js';
// import { UserDao } from "./Dao/index.js";
import MongoStore from 'connect-mongo';
import { PassportAuth } from './middlewares/strategy.js';

const PORT = config.SERVER.PORT;
const MONGO_DB_URI = config.DATABASES.mongo.url;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine(
  "hbs", 
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  }));
app.set("view engine", "hbs");
app.set('views', './public');

app.use(express.static("public"));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_DB_URI,
      ttl: 600,
    }),
    secret:'secret',
    resave: false,
    saveUninitialized: false,
    rolling: false,
    cookie: {
      maxAge: 600000,
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

PassportAuth.init();

app.use("/api/productos", routerProducts);
app.use("/api/carrito", routerCarrito);
app.use('/',routerSession);



app.use("*", (req, res) => {
  res.send({ error: -1, descripcion: "ruta 'x' método 'y' no autorizada" });
});

const server = app.listen(PORT, async () => {
  console.log(`Running on port ${PORT}`);
});
server.on("error", (err) => console.log(`Error en el servidor: ${err}`));

import express from "express";
import passport from 'passport';
import session from "express-session";
import {engine} from 'express-handlebars';
import { routerProducts, routerCarrito, routerSession } from "./Routes/index.js";
import { config } from './config/index.js';
import { PassportAuth } from './middlewares/strategy.js';
import cookieParser from "cookie-parser";

const PORT = config.SERVER.PORT;
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

// app.use(express.static("public"));

app.use(cookieParser());

app.use(
  session({
    secret:'secret',
    resave: false,
    saveUninitialized: false,
    rolling: false,
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

import express from "express";
import passport from 'passport';
import MongoStore from 'connect-mongo';
import session from "express-session";
import { Strategy as LocalStrategy } from 'passport-local';
import * as strategy from './passport/strategy.js';
import {engine} from 'express-handlebars';
import { routerProducts, routerCarrito, routerSession } from "./Routes/index.js";
import { User } from './models/index.js';
import { config } from './config/index.js';

import mongoose from 'mongoose';

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

app.use(session({
  store:MongoStore.create({
    mongoUrl: MONGO_DB_URI,
    ttl:600, 
    collectionName:'sessions'
}),
secret:'secret',
resave: false,
saveUninitialized: false,
rolling: false,
cookie: {
  maxAge: 600000,
}
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use( "login", new LocalStrategy({ passReqToCallback: true }, strategy.login));

passport.use( "register", new LocalStrategy({ passReqToCallback: true }, strategy.register));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



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

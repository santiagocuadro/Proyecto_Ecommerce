import express from 'express';
import passport from "passport";
import Authenticated from '../../middlewares/authenticated.js';
import { SessionController } from '../../controllers/index.js';

const router = express.Router();


router.post("/register", SessionController.postRegister);

router.post("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), SessionController.postLogin);

router.get("/", Authenticated, SessionController.getHome);

router.get("/login", Authenticated, SessionController.getLogin);

router.get("/logout", SessionController.getLogout);

router.get("/register", SessionController.getRegister);

router.get("/failregister", SessionController.getFailregister);

router.get("/faillogin", SessionController.getFaillogin);

router.post('/productos', SessionController.postProductos);

router.get("/carrito",SessionController.getCarrito);

router.get("/carritoPedido",SessionController.getCarritoPedido);



export { router as routerSession } 

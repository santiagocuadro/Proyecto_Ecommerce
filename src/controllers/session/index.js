import { ProductDao, UserDao, CartDao, OrdenDao } from '../../Dao/index.js';
import { DATE_UTILS } from '../../utils/date-utils.js';
import { LOGGER_UTILS } from '../../utils/logger-utils.js';
import { JWT_UTILS } from '../../utils/jwt-utils.js';
import bCrypt from "bcrypt";
import { enviarEmail, enviarWpp } from '../../utils/mensajes-email-wpp.js';
import { config } from '../../config/index.js';

const createHash = function (password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

/** 
 * Registro un nuevo usuario 
*/
const postRegister = async (req, res) => {
	try {
    const datos = req.body;
    const email = datos.email;
    const user = await UserDao.getOne({ email: email });
    if (user) {
      console.log("User already exists");
      res.redirect('/failregister');
    } else {
      const password = createHash(datos.password);
      const name = datos.name;
      const age = datos.age;
      const direction = datos.direction;
      const telephone = datos.telephone;
      const avatar = datos.avatar;

      const datosEmail = { email, name, age, direction, telephone };
      const html = '<h1>Usuario creado con exito!<h1><br><h2>Informacion de usuario<h2><h4>Nombre:'+datosEmail.name+'<h4><br><h4>Edad: '+datosEmail.age+'<h4><br><h4>Direccion:'+datosEmail.direction+'<h4><br><h4>Telefono:'+datosEmail.telephone+'<h4>';

      //Creo un carrito para guardarlo al usuario
			const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };
    	const cart = await CartDao.save(baseCart);
			
      await UserDao.save({ email, password, name, age, direction, telephone, avatar, cart: cart });

      enviarEmail(datosEmail.email, 'Usuario creado con exito', html);
			
      res.redirect("/");
    }
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
    res.status(400);
  }
}

/**
 * Ingresa un usuario ya registrado
*/
const postLogin = async (req, res) => {
  try {
    const { user } = req;
    const token = JWT_UTILS.createToken(user, "secret");

    res.cookie("tokenCookie", token, { maxAge: 1000 * 60 * 60 });
    res.redirect("/");
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
  }
}

/**
 * Redirigo a login para iniciar
*/
const getHome = async (req, res) => {
  try {
    res.redirect("/login");
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
  }
}


const getLogin = async (req, res) => {
  try {
    res.render("view/login");
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
  }
}

const getLogout = async (req, res) => {
  try {
    const { user } = req;
    req.logOut({}, () => true);
    
    res.clearCookie("tokenCookie");
    res.render("view/logout", { name: user.name });
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
  }
}

const getRegister = async (req, res) => {
  try {
    res.render("view/register");
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
  }
}

const getFailregister = async (req, res) => {
  try {
    res.render("view/register-error", {});
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
  }
}

const getFaillogin = async (req, res) => {
  try {
    res.render("view/login-error", {});
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
  }
}

const postProductos = async (req, res) => {
  try {
    const { title, description, code, thumbnail, price, stock } = req.body;
    const product = { title, description, code, thumbnail, price, stock, timestamp:DATE_UTILS.getTimestamp() };
    await ProductDao.save(product);
    const products = await ProductDao.getAll();

    const { user } = req;

    res.status(200).render('view/home', { productos: products, username: user.name });
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
    res.status(404);
  }
}

const getCarrito = async (req, res) => {
  try {
    const { user } = req;
    const carrito = await CartDao.getById(user.cart);
    const productos = carrito.products;

    res.status(200).render('view/carrito', { username: user.name, carrito: productos });
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
    res.status(404);
  }
}

const getCarritoPedido = async (req, res) => {
  try {
    const { user } = req;
    const cartId = user.cart;

    const carrito = await CartDao.getById(cartId);
    const productos = carrito.products;

    let pedidoRealizado = false;

    if(productos.length !== 0) {
      let html = ``;
      productos.forEach(element => {
        html += '<img style="height: 3rem;" src="{{'+element.thumbnail+'}}" alt="imagen producto">'+
                '<h4> Nombre:'+element.title+' <h4>'+
                '<h4> Descripcion: '+element.description+'<h4>'+
                '<h4> Codigo:'+element.code+'<h4>'+
                '<h4> Precio: $'+element.price+'<h4>'+
                '<h4> Stock: '+element.stock+'<h4>';
      });
      enviarWpp(user.telephone, `Nuevo pedido de ${user.name}, email: ${user.email} :`);
      enviarEmail(config.ADMIN_EMAIL, `Nuevo pedido de ${user.name}, email: ${user.email} :`, html);
      const orden = {timestamp: DATE_UTILS.getTimestamp(), products: productos, emailDestino: user.email};
      const ordenGueardada = await OrdenDao.save(orden);
      console.log(ordenGueardada);

      pedidoRealizado = true;
    }


    res.status(200).render('view/carrito', { username: user.name, carrito: productos, pedidoRealizado: pedidoRealizado });
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
    res.status(400);
  }

}


export const SessionController = {
	postRegister,
	postLogin,
	getHome,
	getLogin,
	getLogout,
	getRegister,
	getFailregister,
	getFaillogin,
	postProductos,
  getCarrito,
  getCarritoPedido,
}


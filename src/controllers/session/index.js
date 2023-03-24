import { ProductDao, UserDao, CartDao } from '../../Dao/index.js';
import { DATE_UTILS } from '../../utils/date-utils.js';
import { JWT_UTILS } from '../../utils/jwt-utils.js';
import bCrypt from "bcrypt";
import { enviarEmail } from '../../utils/nodemailer.js';


const createHash = function (password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

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

      //Creo un carrito para guardarlo al usuario
			const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };
    	const cart = await CartDao.save(baseCart);
			
      await UserDao.save({ email, password, name, age, direction, telephone, avatar, cart: cart });
      
			//Enviar email con info del usuario creado
      enviarEmail(datosEmail);
			
      res.redirect("/");
    }
  } catch (error) {
    console.log('error en register');
    res.status(400);
  }
}


const postLogin = (req, res) => {
  const { user } = req;

  const token = JWT_UTILS.createToken(user, "secret");

  res.cookie("tokenCookie", token, { maxAge: 1000 * 60 * 60 });

  res.redirect("/");
}

const getHome = (req, res) => {
  res.redirect("/login");
}

const getLogin = (req, res) => {
  res.render("view/login");
}

const getLogout = (req, res) => {
  const { user } = req;
  req.logOut({}, () => true);
  res.clearCookie("tokenCookie");
  res.render("view/logout", { name: user.name });
}

const getRegister = async (req, res) => {
  res.render("view/register");
}

const getFailregister = (req, res) => {
  res.render("view/register-error", {});
}

const getFaillogin = (req, res) => {
	res.render("view/login-error", {});
}

const postProductos = async (req, res) => {
  try {
    const { title, description, code, thumbnail, price, stock } = req.body;
    const product = { title, description, code, thumbnail, price, stock, timestamp:DATE_UTILS.getTimestamp() };
    await ProductDao.save(product);
    const products = await ProductDao.getAll();

    const { user } = req;
    const carrito = await CartDao.getById(user.cart);

    res.status(200).render('view/home', { productos: products, username: user.name, carrito: carrito.products });
  } catch (error) {
    console.log(`Error ${error}`);
    res.status(404);
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
	postProductos
}


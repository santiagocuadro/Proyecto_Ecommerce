import { ProductDao, UserDao, CartDao } from '../../Dao/index.js';
import { DATE_UTILS } from '../../utils/date-utils.js';
import bCrypt from "bcrypt";
// import { CartController } from '../../controllers/index.js';
// import nodemailer from 'nodemailer';


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

			const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };
    	const cart = await CartDao.save(baseCart);
			
      await UserDao.save({ email, password, name, age, direction, telephone, avatar, cart });
			console.log(cart);
			
			//Enviar email con info del usuario creado

      res.redirect("/");
    }
  } catch (error) {
    console.log('error en register');
    res.status(400);
  }
}


const postLogin = (req, res) => {
  res.redirect("/");
}

const getHome = (req, res) => {
  res.redirect("/login");
}

const getLogin = (req, res) => {
  res.render("view/login");
}

const getLogout = (req, res) => {
  const { name } = req.user;
  req.logOut({}, () => true);
  res.render("view/logout", { name: name });
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

    res.status(200).render('view/home', { productos: products, username: req.user.username });
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


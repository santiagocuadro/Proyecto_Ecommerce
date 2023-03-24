import { 
	ProductDao, 
	CartDao
} from '../Dao/index.js';

const Authenticated = async (req, res, next) => {
	if (req.isAuthenticated()){
		const productos = await ProductDao.getAll();
		
		const userCarritoId = req.user.cart;
		const cart = await CartDao.getById(userCarritoId);

		return res.render("view/home", { productos: productos, username: req.user.name, carrito: cart.products });
	}
	next()
}

export default Authenticated;

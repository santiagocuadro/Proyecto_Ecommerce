import {ProductDao} from '../Dao/index.js';

const Authenticated = async (req, res, next) => {
	if (req.isAuthenticated()){
		const productos = await ProductDao.getAll();
		return res.render("view/home", { productos: productos, username: req.user.username });
	}
	next()
}

export default Authenticated;

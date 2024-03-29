import { 
	ProductDao, 
} from '../Dao/index.js';
import {isAdmin} from './verifyRole.js';

const Authenticated = async (req, res, next) => {
	if (req.isAuthenticated()){
		const productos = await ProductDao.getAll();
		const { user } = req;

		return res.render("view/home", { admin: isAdmin, productos: productos, username: user.name });
	}
	next()
}

export default Authenticated;


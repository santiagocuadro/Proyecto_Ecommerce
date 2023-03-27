import { CartDao, ProductDao } from '../../Dao/index.js';
import { 
  DATE_UTILS,
  LOGGER_UTILS
} from '../../utils/index.js';

/**
 * Me permite listar todos los productos guardados en el carrito 
 */
const getAll = async (req, res) => {
	try {
    const { id } = req.params;
    const cart = await CartDao.getById(id);
    const products = cart.products;

    res.status(200).send({ success: true, productos: products })
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
    res.status(404).send({success: false})
  }
};

/**
 * Crea un carrito y devuelve su id
 */
const createCart = async (req, res) => {
	try {
    const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };
    const cart = await CartDao.save(baseCart);

    res.status(200).json({ success: true, cartId: cart.id });
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
    res.status(400).send({ success: false});
  }
};

/**
 * Vacia un carrito y lo elimina 
 */
const delateCart = async (req, res) => {
	try {
    const { id } = req.params;
    await CartDao.deleteById(id);

    res.status(200).send({ success: true });
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
    res.send({ success: false });
  }
}

/**
 * Para incorporar productos al carrito por su id de producto
 */
const addProductToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const { user } = req;
    const id = user.cart;

    const cart = await CartDao.getById(id);

    if (!cart) {
      return res.send({ success: false, message: "No existe este carrito" });
    }
    

    const product = await ProductDao.getById(productId);

    if (!product) {
      return res.status(401).send({ success: false, message: "No existe este producto" });
    }
      
    cart.products.push(product);
      
    const updatedCart = await CartDao.updateById(id, cart);
      
    res.status(200).send({ success: true, cart: updatedCart });
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
    res.status(400).send({ success: false });
  }
}

/**
 * Elimina un producto del carrito por su id de carrito y de producto 
 */
const delateProduct = async (req, res) => {
  try {
    const { id_prod } = req.params;
    const id = req.user.cart;
    const cart = await CartDao.getById(id);

    if (!cart) {
      return res.send({ success: false, message: "Carrito no encontrado" });
    }
    
    const index = cart.products.findIndex((element) => element._id === id_prod);
    console.log(cart.products[0]._id);
    console.log(id_prod);

    if (index === -1) return res.status(401).send({success: false, message: "producto no encontrado"});

    cart.products = cart.products.filter((element) => element.id !== id_prod);
    await CartDao.updateById(id, cart);

    res.status(200).send({ success: true , cartProducts: cart.products });
  } catch (error) {
    await LOGGER_UTILS.addLog(error);
    res.status(400).send({ success: false });
  }
}


export const CartController = {
	getAll,
	createCart,
	delateCart,
	addProductToCart,
	delateProduct
}

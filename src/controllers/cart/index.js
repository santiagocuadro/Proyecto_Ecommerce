import { CartDao, ProductDao } from '../../Dao/index.js';
import { DATE_UTILS } from '../../utils/index.js';


const getAll = async (req, res) => {
	try {
    const { id } = req.params;
    const cart = await CartDao.getById(id);
    const products = cart.products;

    res.status(200).send({ success: true, productos: products })
  } catch (error) {
    res.status(404).send({success: false})
  }
};

const createCart = async (req, res) => {
	try {
    const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };
    const cart = await CartDao.save(baseCart);

    res.status(200).json({ success: true, cartId: cart.id });
  } catch (error) {
    res.status(400).send({ success: false});
  }
};

const delateCart = async (req, res) => {
	try {
    const { id } = req.params;
    await CartDao.deleteById(Number(id));

    res.status(200).send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
}

const addProductToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const { id } = req.params;
    const cart = await CartDao.getById(id);

    if (!cart) {
      console.log(cart.id);
      return res.send({ success: false, message: "No existe este carrito" });
    }

    const product = await ProductDao.getById(productId);

    if (!product) {
      return res.status(400).send({ success: false, message: "lista de productos vacia" });
    }

    cart.products.push(product);
    console.log('estoy aca')

    const updatedCart = await CartDao.updateById(id, cart);

    res.status(200).send({ success: true, cart: updatedCart });
  } catch (error) {
    res.status(400).send({ success: false });
  }
}

const delateProduct = async (req, res) => {
  try {
    const { id_prod } = req.params;
    const { id } = req.params;
    const cart = await CartDao.getById(Number(id));

    if (!cart) {
      return res.send({ success: false, message: "Carrito no encontrado" });
    }

    const index = cart.products.findIndex((element) => element.id === Number(id_prod));

    if (index === -1) return res.send({success: false, message: "producto no encontrado"});

    cart.products = cart.products.filter((element) => element.id !== Number(id_prod));
    await CartDao.updateById(Number(id), cart);
    
    res.status(200).send({ success: true , result: cart.products});
  } catch (error) {
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

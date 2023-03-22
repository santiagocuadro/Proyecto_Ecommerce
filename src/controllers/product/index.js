import { ProductDao } from '../../Dao/index.js';
import {	DATE_UTILS,
  				ERRORS_UTILS,
  				JOI_VALIDATOR,
  				LOGGER_UTILS } from '../../utils/index.js';


const getAll = async (req, res) => {
  try {
    const product = await ProductDao.getAll();

    if (!product) {
      return res.status(400).send({ error: ERRORS_UTILS.MESSAGES.NO_PRODUCT });
    }

    res.status(200).send(product);
  } catch (error) {
    res.send({ error: "Internal server error" });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    if(id !== undefined){
      const product = await ProductDao.getById(Number(id));  
      res.status(200).send({product: product});
    }else {
      const product = await ProductDao.getAll();  
      res.status(200).send(product);
    }
  } catch (error) {
    res.send({success: false});
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, description, code, thumbnail, price, stock } = req.body;

    // con el validador que creamos en el archivo joi validator, podemos invocar al método validateAsync y pasarle las propiedades que creemos seran nuestro producto, y si están bien, nos devolvera el objeto que guardamos en product
    // si no, saltará al catch
    const product = await JOI_VALIDATOR.product.validateAsync({
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
      timestamp: DATE_UTILS.getTimestamp(),
    });

    const createdProduct = await ProductDao.save(product);

    res.status(200).send(createdProduct);
  } catch (error) {
    // no seria recomendable guardar logs de errores de input de usuario, que genera joi
    // normalmente guardariamos errores propios e internos del servidor
    await LOGGER_UTILS.addLog(error);
    res.status(400).send(error);
  }
};

const updateById = async (req, res) => {
	try {
    const { id } = req.params;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const updatedProduct = await ProductDao.updateById(
      id, 
      { nombre, descripcion, codigo, foto, precio, stock, timestamp:DATE_UTILS.getTimestamp() }
    );

    res.status(200).send({ updatedProduct });
  } catch (error) {
    res.status(400).send({ success: false});
  }
}

const deleteById = async (req, res) => {
	try {
    const { id } = req.params;
    await ProductDao.deleteById(Number(id));

    res.status(200).send({ success: true });
  } catch (error) {
    res.status(400).send({ success: false });
  }
};


export const ProductController = {
	getAll,
	getById,
	createProduct,
	updateById,
	deleteById
}
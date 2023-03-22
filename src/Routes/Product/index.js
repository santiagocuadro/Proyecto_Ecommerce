import express from "express";
import { verifyRole } from "../../middlewares/verifyRole.js";
import { ProductController } from '../../controllers/index.js';

const router = express.Router();

router.get("/", ProductController.getAll);

// Me permite listar todos los productos disponibles o un producto por su id
// (disponible para usuarios y administradores)
router.get("/:id?", ProductController.getById);

// Para incorporar productos al listado
// (disponible para administradores)
router.post("/", verifyRole, ProductController.createProduct,async (req, res) => {
  // try {
  //   const { title, description, code, foto, thumbnail, price, stock } = req.body;
  //   const product = { title, description, code, foto, thumbnail, price, stock, timestamp:DATE_UTILS.getTimestamp() };
  //   const productoCompleto = await ProductDao.save(product);

  //   res.send({product: productoCompleto});
  // } catch (error) {
  //   res.send({ success: false});
  // }
});

// Actualiza un producto por su id
// (disponible para administradores)
router.put("/:id", ProductController.updateById);

// Borra un producto por su id
// (disponible para administradores)
router.delete("/:id",ProductController.deleteById);

export { router as routerProducts };

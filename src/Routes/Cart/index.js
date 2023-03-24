import express from "express";
import { CartController } from '../../controllers/index.js';

const router = express.Router();

// Crea un carrito y devuelve su id
router.post("/", CartController.createCart);

// Vacia un carrito y lo elimina 
router.delete("/:id", CartController.delateCart);

// Me permite listar todos los productos guardados en el carrito 
router.get("/:id/productos", CartController.getAll);

// Para incorporar productos al carrito por su id de producto
router.post("/:id/productos", CartController.addProductToCart);

// Elimina un producto del carrito por su id de carrito y de producto 
router.delete("/:id/productos/:id_prod", CartController.delateProduct);

export { router as routerCarrito };

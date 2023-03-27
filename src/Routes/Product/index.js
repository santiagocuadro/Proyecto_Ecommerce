import express from "express";
import { verifyRole } from "../../middlewares/verifyRole.js";
import { isValidAuthToken } from "../../middlewares/auth.js";
import { ProductController } from '../../controllers/index.js';

const router = express.Router();

/**
 * Me permite listar todos los productos disponibles
 */
router.get("/", isValidAuthToken, ProductController.getAll);

/**
 * Me permite listar todos los productos disponibles o un producto por su id
 * (disponible para usuarios y administradores)
 */
router.get("/:id?", ProductController.getById);
/**
 * Para incorporar productos al listado
 * (disponible para administradores)
 */
router.post("/", verifyRole, ProductController.createProduct);
/** 
 * Actualiza un producto por su id
 * (disponible para administradores)
*/
router.put("/:id", ProductController.updateById);

/** 
 * Borra un producto por su id
 * (disponible para administradores)
*/
router.delete("/:id",ProductController.deleteById);

export { router as routerProducts };

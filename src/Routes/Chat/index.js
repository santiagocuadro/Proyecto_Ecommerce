import express from "express";
import { ChatController } from '../../controllers/index.js';

const router = express.Router();


router.get('/', ChatController.enviarMensaje);


router.get('/:email', ChatController.enviarEmail);




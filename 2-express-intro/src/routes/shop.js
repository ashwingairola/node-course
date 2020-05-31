import express from 'express';

import { ProductsController } from '../controllers/products.js';

const router = express.Router();

router.get('/', ProductsController.getProducts);

export default router;

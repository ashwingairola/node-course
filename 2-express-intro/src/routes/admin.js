import express from 'express';

import { ProductsController } from '../controllers/products.js';

const router = express.Router();

router.get('/add-product', ProductsController.getAddProduct);

router.post('/add-product', ProductsController.postAddProduct);

export default router;

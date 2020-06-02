import express from 'express';

import { AdminController } from '../controllers/AdminController.js';

const router = express.Router();

router.get('/add-product', AdminController.getAddProduct);

router.post('/add-product', AdminController.postAddProduct);

router.get('/products', AdminController.getProducts);

export default router;

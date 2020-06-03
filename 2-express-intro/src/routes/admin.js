import express from 'express';

import { AdminController } from '../controllers/AdminController.js';

const router = express.Router();

router.get('/products', AdminController.getProducts);
router.get('/add-product', AdminController.getAddProduct);
router.post('/add-product', AdminController.postAddProduct);
router.get('/edit-product/:productId', AdminController.getEditProduct);
router.post('/edit-product', AdminController.postEditProduct);
router.post('/delete-product', AdminController.postDeleteProduct);

export default router;

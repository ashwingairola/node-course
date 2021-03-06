import express from 'express';

import { ShopController } from '../controllers/ShopController.js';

const router = express.Router();

router.get('/', ShopController.getIndex);
router.get('/products', ShopController.getProducts);
router.get('/products/:productId', ShopController.getProduct);
router.post('/cart/delete', ShopController.postDeleteCart);
router.get('/cart', ShopController.getCart);
router.post('/cart', ShopController.postCart);
router.post('/order', ShopController.postOrder);
router.get('/orders', ShopController.getOrders);
router.get('/checkout', ShopController.getCheckout);

export default router;

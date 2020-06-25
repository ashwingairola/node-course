import express from 'express';

import { ErrorController } from '../controllers/ErrorController.js';

const router = express.Router();

router.get('/page-not-found', ErrorController.get404);
router.get('/product-not-found', ErrorController.getProductNotFound);
router.get('/order-error', ErrorController.getOrderError);

export default router;

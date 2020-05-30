// import url from 'url';
// import path from 'path';
import express from 'express';

import { products } from './admin.js';

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
	// console.log(products);
	// res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
	// res.render('shop', { products, pageTitle: 'Shop', path: '/' });
	res.render('shop', {
		products,
		pageTitle: 'Shop',
		path: '/',
		hasProducts: !!products.length,
		activeShop: true,
		productCSS: true
	});
});

export default router;

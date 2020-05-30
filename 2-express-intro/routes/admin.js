// import url from 'url';
// import path from 'path';
import express from 'express';

// import { rootDir } from '../util/path.js';

// Creating __filename and __dirname in ES6 mode.
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export const router = express.Router();
export const products = [];

router.get('/add-product', (_req, res) => {
	res.render('add-product', {
		pageTitle: 'Add Product',
		path: '/admin/add-product',
		activeProducts: true,
		productCSS: true,
		formsCSS: true
	});

	// res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));

	// This works only in a CommonJS environment.
	// res.sendFile(path.join(rootDir, '..', 'views', 'add-product.html'));
});

router.post('/add-product', (req, res) => {
	products.push({ title: req.body.title });
	res.redirect('/');
});

// export default router;

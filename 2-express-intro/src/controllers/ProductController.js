import { Product } from '../models/Product.js';

export class ProductsController {
	static getAddProduct(req, res) {
		res.render('admin/add-product', {
			pageTitle: 'Add Product',
			path: '/admin/add-product',
			activeProducts: true,
			productCSS: true,
			formsCSS: true
		});
	}

	static postAddProduct(req, res) {
		const product = new Product(req.body.title);
		product.save();
		res.redirect('/');
	}

	static getProducts(req, res) {
		Product.fetchAll(products => {
			res.render('shop/product-list', {
				products,
				pageTitle: 'Shop',
				path: '/',
				hasProducts: !!products.length,
				activeShop: true,
				productCSS: true
			});
		});
	}
}

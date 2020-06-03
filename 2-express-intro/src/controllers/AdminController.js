import { Product } from '../models/Product.js';

export class AdminController {
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
		const title = req.body.title;
		const imageUrl = req.body.imageUrl;
		const price = +req.body.price;
		const description = req.body.description;

		const product = new Product(title, imageUrl, description, price);
		product.save();
		res.redirect('/');
	}

	static getProducts(req, res, next) {
		Product.fetchAll(products => {
			res.render('admin/products', {
				products,
				pageTitle: 'Admin Products',
				path: '/admin/products'
			});
		});
	}
}

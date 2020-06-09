import { Product } from '../models/Product.js';

export class AdminController {
	static getAddProduct(req, res) {
		res.render('admin/edit-product', {
			pageTitle: 'Add Product',
			path: '/admin/add-product',
			editing: false,
			product: null
		});
	}

	static postAddProduct(req, res) {
		const title = req.body.title;
		const imageUrl = req.body.imageUrl;
		const price = +req.body.price;
		const description = req.body.description;

		const product = new Product(title, imageUrl, description, price);
		product
			.save()
			.then(() => {
				res.redirect('/');
			})
			.catch(err => {
				console.log(err);
				res.redirect('/error/product-not-found');
			});
	}

	static getEditProduct(req, res) {
		const editMode = req.query.edit === 'true' ? true : false;
		if (!editMode) {
			res.redirect(301, '/');
		}

		const productId = req.params.productId.trim();

		Product.findById(productId, product => {
			if (!product) {
				return res.redirect(302, 'error/product-not-found', {
					pageTitle: 'Product Not Found'
				});
			}

			res.render('admin/edit-product', {
				pageTitle: 'Edit Product',
				path: '/admin/edit-product',
				editing: editMode,
				product
			});
		});
	}

	static postEditProduct(req, res) {
		const { id, title, price, imageUrl, description } = req.body;
		const product = new Product(title, imageUrl, description, +price, id);
		product.edit(() => {
			res.redirect('/admin/products');
		});
	}

	static postDeleteProduct(req, res) {
		const productId = req.body.id;

		Product.deleteById(productId, () => {
			res.redirect('/admin/products');
		});
	}

	static getProducts(req, res) {
		Product.fetchAll(products => {
			res.render('admin/products', {
				products,
				pageTitle: 'Admin Products',
				path: '/admin/products'
			});
		});
	}
}

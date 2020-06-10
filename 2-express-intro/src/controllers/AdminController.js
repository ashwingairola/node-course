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

		Product.create({
			title,
			imageUrl,
			price,
			description
		})
			.then(() => {
				res.redirect('/products');
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

		const productId = req.params.productId;

		Product.findByPk(productId)
			.then(result => {
				if (!result) {
					throw new Error('Product not found.');
				}

				res.render('admin/edit-product', {
					pageTitle: 'Edit Product',
					path: '/admin/edit-product',
					editing: editMode,
					product: result
				});
			})
			.catch(err => {
				console.log(err);
				return res.redirect('error/product-not-found');
			});
	}

	static postEditProduct(req, res) {
		const { id, title, imageUrl, description } = req.body;
		const price = +req.body.price;

		Product.update(
			{ title, price, imageUrl, description },
			{ where: { id } }
		)
			.then(() => {
				res.redirect('/admin/products');
			})
			.catch(err => {
				console.error(err);
				res.redirect('/error/product-not-found');
			});
	}

	static postDeleteProduct(req, res) {
		const productId = req.body.id;

		Product.destroy({ where: { id: productId } })
			.then(() => {
				res.redirect('/admin/products');
			})
			.catch(err => {
				console.error(err);
				res.redirect('/error/product-not-found');
			});
	}

	static getProducts(req, res) {
		Product.findAll()
			.then(results => {
				res.render('admin/products', {
					products: results,
					pageTitle: 'Admin Products',
					path: '/admin/products'
				});
			})
			.catch(err => {
				console.error(err);
				res.redirect('/error/product-not-found');
			});
	}
}

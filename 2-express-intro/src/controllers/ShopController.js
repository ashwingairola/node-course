import { Product } from '../models/Product.js';
import { Cart } from '../models/Cart.js';

export class ShopController {
	static getProducts(req, res) {
		Product.fetchAll(products => {
			res.render('shop/product-list', {
				products,
				pageTitle: 'Products',
				path: '/products'
			});
		});
	}

	static getProduct(req, res) {
		const { productId } = req.params;

		Product.findById(productId, product => {
			if (product) {
				res.render('shop/product-detail', {
					product,
					pageTitle: product.title,
					path: '/products'
				});
			} else {
				res.render('error/404', {
					pageTitle: 'Page Not Found',
					path: ''
				});
			}
		});
	}

	static getIndex(req, res, next) {
		Product.fetchAll(products => {
			res.render('shop/index', {
				products,
				pageTitle: 'Shop',
				path: '/'
			});
		});
	}

	static getCart(req, res, next) {
		res.render('shop/cart', {
			pageTitle: 'Cart',
			path: '/cart'
		});
	}

	static postCart(req, res) {
		const productId = req.body.productId.trim();

		Cart.addProduct(productId, err => {
			if (err) {
				return res.redirect(404, '/error/product-not-found');
			}

			res.render('shop/cart', {
				pageTitle: 'Cart',
				path: '/cart'
			});
		});
	}

	static postDeleteCart(req, res) {
		const productId = req.body.productId;

		Cart.deleteProduct(productId, err => {
			if (err) {
				return res.redirect(404, '/error/product-not-found');
			}

			res.redirect('/shop/cart');
		});
	}

	static getOrders(req, res, next) {
		res.render('shop/orders', {
			pageTitle: 'Orders',
			path: '/orders'
		});
	}

	static getCheckout(req, res, next) {
		res.render('shop/checkout', {
			pageTitle: 'Checkout',
			path: '/checkout'
		});
	}
}

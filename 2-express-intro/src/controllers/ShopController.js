import { Product } from '../models/Product.js';

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

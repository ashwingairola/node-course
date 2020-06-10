import { Product } from '../models/Product.js';
import { Cart } from '../models/Cart.js';

export class ShopController {
	static getProducts(req, res) {
		Product.findAll()
			.then(result => {
				res.render('shop/product-list', {
					products: result,
					pageTitle: 'Products',
					path: '/products'
				});
			})
			.catch(err => {
				console.error(err);
				res.redirect('/error/product-not-found');
			});
	}

	static getProduct(req, res) {
		const { productId } = req.params;

		Product.findByPk(productId)
			.then(result => {
				if (result) {
					res.render('shop/product-detail', {
						product: result,
						pageTitle: result.title,
						path: '/products'
					});
				} else {
					throw new Error('Product not found.');
				}
			})
			.catch(err => {
				console.log(err);
				res.redirect('/error/product-not-found');
			});
	}

	static getIndex(req, res) {
		Product.findAll().then(results => {
			res.render('shop/index', {
				products: results,
				pageTitle: 'Shop',
				path: '/'
			}).catch(err => {
				console.error(err);
				res.redirect('/error/page-not-found');
			});
		});
	}

	static getCart(req, res) {
		Cart.getCart(cart => {
			Product.fetchAll(products => {
				const cartProducts = [];

				products.forEach(product => {
					const cartProductData = cart.products.find(
						prod => prod.id === product.id
					);
					if (cartProductData) {
						cartProducts.push({
							productData: product,
							qty: cartProductData.qty
						});
					}
				});

				res.render('shop/cart', {
					pageTitle: 'Cart',
					path: '/cart',
					products: cartProducts
				});
			});
		});
	}

	static postCart(req, res) {
		const productId = req.body.productId.trim();

		Cart.addProduct(productId, err => {
			if (err) {
				return res.redirect(404, '/error/product-not-found');
			}

			res.redirect('/cart');
		});
	}

	static postDeleteCart(req, res) {
		const productId = req.body.productId;

		Cart.deleteProduct(productId, err => {
			if (err) {
				return res.redirect(404, '/error/product-not-found');
			}

			res.redirect('/cart');
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

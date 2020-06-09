import { Product } from '../models/Product.js';
import { Cart } from '../models/Cart.js';

export class ShopController {
	static getProducts(req, res) {
		Product.fetchAll()
			.then(([rows]) => {
				res.render('shop/product-list', {
					products: rows,
					pageTitle: 'Products',
					path: '/products'
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	static getProduct(req, res) {
		const { productId } = req.params;

		Product.findById(productId)
			.then(data => {
				const product = data[0][0];
				if (product) {
					res.render('shop/product-detail', {
						product,
						pageTitle: product.title,
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
		Product.fetchAll()
			.then(([rows]) => {
				res.render('shop/index', {
					products: rows,
					pageTitle: 'Shop',
					path: '/'
				});
			})
			.catch(err => {
				console.log(err);
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

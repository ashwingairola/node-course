import { Product } from '../models/Product.js';
import { Cart } from '../models/Cart.js';
import { CartItem } from '../models/CartItem.js';

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
		Product.findAll()
			.then(results => {
				res.render('shop/index', {
					products: results,
					pageTitle: 'Shop',
					path: '/'
				});
			})
			.catch(err => {
				console.error(err);
				res.redirect('/error/page-not-found');
			});
	}

	static getCart(req, res) {
		req.user
			.getCart()
			.then(cart => {
				if (!cart) {
					throw new Error('Cart not found.');
				}

				return cart.getProducts();
			})
			.then(cartItems => {
				res.render('shop/cart', {
					pageTitle: 'Cart',
					path: '/cart',
					products: cartItems
				});
			})
			.catch(err => {
				console.error(err);
				res.redirect('/error/product-not-found');
			});
	}

	static postCart(req, res) {
		const productId = req.body.productId;
		let fetchedCart;
		let newQuantity;

		req.user
			.getCart()
			.then(cart => {
				if (!cart) {
					throw new Error('Cart not found');
				}

				fetchedCart = cart;

				return cart.getProducts({ where: { id: productId } });
			})
			.then(products => {
				let product;

				if (products.length) {
					product = products[0];
				}

				if (product) {
					// Update quantity
					newQuantity = product.cartItem.quantity + 1;
					return product;
				}

				return Product.findByPk(productId);
			})
			.then(product => {
				return fetchedCart.addProduct(product, {
					through: { quantity: newQuantity }
				});
			})
			.then(() => {
				res.redirect('/cart');
			})
			.catch(err => {
				console.error(err);
				res.redirect('/error/product-not-found');
			});
	}

	static postDeleteCart(req, res) {
		const productId = req.body.productId;

		req.user
			.getCart()
			.then(cart => {
				return cart.getProducts({ where: { id: productId } });
			})
			.then(products => {
				const product = products[0];
				return product.cartItem.destroy();
			})
			.then(() => {
				res.redirect('/cart');
			})
			.catch(err => {
				console.error(err);
				res.redirect('/err/product-not-found');
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

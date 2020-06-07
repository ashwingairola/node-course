import fs from 'fs';
import path from 'path';

import { Product } from './Product.js';

export class Cart {
	static #filePath = path.join('src', 'data', 'cart.json');

	static getCart = callback => {
		fs.readFile(Cart.#filePath, (err, content) => {
			if (err) {
				return callback({ products: [], totalPrice: 0 });
			}

			try {
				callback(JSON.parse(content));
			} catch (e) {
				callback({ products: [], totalPrice: 0 });
			}
		});
	};

	static addProduct(id, callback) {
		Cart.getCart(cart => {
			// Analyse the cart => find existing product.
			const existingProduct = cart.products.find(prod => prod.id === id);

			if (existingProduct) {
				existingProduct.qty++;
				cart.totalPrice += existingProduct.price;
			} else {
				Product.findById(id, product => {
					if (product) {
						cart.products.push({
							id: product.id,
							price: product.price,
							qty: 1
						});
						cart.totalPrice += product.price;
					} else {
						return callback(new Error('Product does not exist'));
					}

					Cart.#updateCartFile(cart, callback);
				});
			}
			Cart.#updateCartFile(cart, callback);
		});
	}

	static deleteProduct(productId, callback) {
		Cart.getCart(cart => {
			const product = cart.products.find(prod => prod.id === productId);

			if (!product) {
				return callback(new Error('Product not found'));
			}

			cart.totalPrice -= product.price * product.qty;
			cart.products = cart.products.filter(prod => prod.id !== productId);

			fs.writeFile(Cart.#filePath, JSON.stringify(cart), () => {
				callback();
			});
		});
	}

	static #updateCartFile = (cartData, callback) => {
		fs.writeFile(Cart.#filePath, JSON.stringify(cartData), e => {
			if (e) {
				return callback(
					new Error('An error occured while saving the cart.')
				);
			}
			callback();
		});
	};
}

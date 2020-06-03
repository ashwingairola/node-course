import fs from 'fs';
import path from 'path';

import { Product } from './Product.js';

const filePath = path.join('src', 'data', 'cart.json');

export class Cart {
	static addProduct(id, callback) {
		// Fetch the previous cart.
		fs.readFile(filePath, (err, content) => {
			let cart = { products: [], totalPrice: 0 };
			if (!err) {
				try {
					cart = JSON.parse(content);
				} catch (e) {}
			}

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

	static #updateCartFile = (cartData, callback) => {
		fs.writeFile(filePath, JSON.stringify(cartData), e => {
			if (e) {
				return callback(
					new Error('An error occured while saving the cart.')
				);
			}
			callback();
		});
	};
}

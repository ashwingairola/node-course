import fs from 'fs';
import path from 'path';

export class Product {
	static #products = [];
	static #filePath = path.join('src', 'data', 'products.json');

	constructor(title, imageUrl, description, price, id) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
		this.id = id;
	}

	save(callback) {
		this.id = Math.random().toString();

		Product.#getProductsFromFile(products => {
			products.push(this);
			fs.writeFile(Product.#filePath, JSON.stringify(products), () => {
				if (callback) {
					callback();
				}
			});
		});
	}

	edit(callback) {
		Product.#getProductsFromFile(products => {
			const existingProductIndex = products.findIndex(
				prod => prod.id === this.id
			);

			const updatedProducts = [...products];
			updatedProducts[existingProductIndex] = this;

			fs.writeFile(
				Product.#filePath,
				JSON.stringify(updatedProducts),
				() => {
					if (callback) {
						callback();
					}
				}
			);
		});
	}

	static delete(productId, callback) {
		Product.#getProductsFromFile(products => {
			products = products.filter(product => product.id !== productId);

			fs.writeFile(Product.#filePath, JSON.stringify(products), () => {
				if (callback) {
					callback();
				}
			});
		});
	}

	static fetchAll(callback) {
		Product.#getProductsFromFile(callback);
	}

	static findById(id, callback) {
		Product.#getProductsFromFile(products => {
			const product = products.find(prod => prod.id === id);
			callback(product);
		});
	}

	static #getProductsFromFile = callback => {
		fs.readFile(Product.#filePath, (err, content) => {
			if (err) {
				return callback([]);
			}

			try {
				callback(JSON.parse(content));
			} catch (e) {
				return callback([]);
			}
		});
	};
}

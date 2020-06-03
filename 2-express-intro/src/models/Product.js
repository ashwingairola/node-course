import fs from 'fs';
import path from 'path';

const filePath = path.join('src', 'data', 'products.json');

const getProductsFromFile = callback => {
	fs.readFile(filePath, (err, content) => {
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

export class Product {
	static #products = [];

	constructor(title, imageUrl, description, price) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		this.id = Math.random().toString();
		getProductsFromFile(products => {
			products.push(this);
			fs.writeFile(filePath, JSON.stringify(products), e => {
				console.log(e);
			});
		});
	}

	static fetchAll(callback) {
		getProductsFromFile(callback);
	}

	static findById(id, callback) {
		getProductsFromFile(products => {
			const product = products.find(prod => prod.id === id);
			callback(product);
		});
	}
}

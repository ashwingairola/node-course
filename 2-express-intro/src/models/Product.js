import fs from 'fs';
import url from 'url';
import path from 'path';

const filePath = path.join('src', 'data', 'products.json');

const getProductsFromFile = callback => {
	fs.readFile(filePath, (err, content) => {
		if (err) {
			return callback([]);
		}

		callback(JSON.parse(content));
	});
};

export class Product {
	static #products = [];

	constructor(title) {
		this.title = title;
	}

	save() {
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
}

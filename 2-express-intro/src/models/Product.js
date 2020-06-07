import { CONNECTION_POOL as db } from '../util/database.js';
import { Cart } from './Cart.js';

export class Product {
	static #products = [];

	constructor(title, imageUrl, description, price, id) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
		this.id = id;
	}

	save() {}

	edit() {}

	static deleteById(productId) {}

	static fetchAll() {
		return db.execute('SELECT * FROM products;');
	}

	static findById(id) {}
}

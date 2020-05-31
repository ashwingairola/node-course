export class ProductsController {
	static #products = [];

	static getAddProduct(req, res) {
		res.render('add-product', {
			pageTitle: 'Add Product',
			path: '/admin/add-product',
			activeProducts: true,
			productCSS: true,
			formsCSS: true
		});
	}

	static postAddProduct(req, res) {
		ProductsController.#products.push({ title: req.body.title });
		res.redirect('/');
	}

	static getProducts(req, res) {
		res.render('shop', {
			products: ProductsController.#products,
			pageTitle: 'Shop',
			path: '/',
			hasProducts: !!ProductsController.#products.length,
			activeShop: true,
			productCSS: true
		});
	}
}

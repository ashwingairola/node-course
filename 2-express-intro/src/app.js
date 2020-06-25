import url from 'url';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import adminRouter from './routes/admin.js';
import shopRouter from './routes/shop.js';
import errorRouter from './routes/error.js';

import { startServer } from './util/server.js';
import { SEQUELIZE } from './util/database.js';

import { Product } from './models/Product.js';
import { User } from './models/User.js';
import { Cart } from './models/Cart.js';
import { CartItem } from './models/CartItem.js';
import { Order } from './models/Order.js';
import { OrderItem } from './models/OrderItem.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Setting the templating engine
// EJS
app.set('view engine', 'ejs');

// Default value
app.set('views', path.join(__dirname, 'views'));

// Adding the body-parser middleware to parse all incoming request payloads.
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to serve static files.
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	User.findByPk(1)
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => console.error(err));
});

app.use('/admin', adminRouter);
app.use('/error', errorRouter);
app.use(shopRouter);

// Middleware for the 404 page, uses '/' as default.
app.use((req, res) => {
	res.status(302).redirect('/error/page-not-found');
});

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

SEQUELIZE.sync({
	// force: true
})
	.then(() => User.findByPk(1))
	.then(user => {
		if (!user) {
			return User.create({
				name: 'Golu',
				email: 'golu69@naughtyboi.cum'
			});
		}
		return user;
	})
	.then(user => {
		return user.createCart();
	})
	.then(() => {
		startServer(app);
	})
	.catch(err => {
		console.log(err);
	});

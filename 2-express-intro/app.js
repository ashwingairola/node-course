import url from 'url';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
// import hbs from 'express-handlebars';

import { router as adminRouter } from './routes/admin.js';
import shopRouter from './routes/shop.js';
import errorRouter from './routes/error.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Setting the templating engine

// Pug
// app.set('view engine', 'pug');

// Handlebars
// layoutsDir is default.
// app.engine(
// 	'hbs',
// 	hbs({
// 		layoutsDir: 'views/layouts',
// 		defaultLayout: 'main-layout',
// 		extname: 'hbs'
// 	})
// );
// app.set('view engine', 'hbs');

// EJS
app.set('view engine', 'ejs');

// Default value
app.set('views', 'views');

// app.use((req, res, next) => {
// 	console.log('In the middleware!');
// 	next();
// });

// Adding a middleware that applies to all routes.
// app.use('/', (_req, _res, next) => {
// 	next();
// });

// Adding the body-parser middleware to parse all incoming request payloads.
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to serve static files.
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/error', errorRouter);
app.use(shopRouter);

// Middleware for the 404 page, uses '/' as default.
app.use((_req, res) => {
	res.status(302).redirect('/error/page-not-found');
});

app.listen(5000);

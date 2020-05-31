import url from 'url';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import adminRouter from './routes/admin.js';
import shopRouter from './routes/shop.js';
import errorRouter from './routes/error.js';

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

app.use('/admin', adminRouter);
app.use('/error', errorRouter);
app.use(shopRouter);

// Middleware for the 404 page, uses '/' as default.
app.use((req, res) => {
	res.status(302).redirect('/error/page-not-found');
});

app.listen(5000);

import url from 'url';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import homeRouter from './home/home.js';
import userRouter from './users/users.js';
import errorRouter from './error/error.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Using middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Using routers
app.use('/users', userRouter);
app.use('/error', errorRouter);
app.use(homeRouter);

app.use((_req, res) => {
	res.redirect('/error/page-not-found');
});

app.listen(5000);

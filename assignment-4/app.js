import url from 'url';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import homeRouter from './src/routes/home.js';
import userRouter from './src/routes/users.js';
import errorRouter from './src/routes/error.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Use EJS as the template engine.
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', 'views');

// Use body-parser to parse incoming request payloads.
app.use(bodyParser.urlencoded({ extended: true }));

// Use express.static to serve static files.
app.use(express.static(path.join(__dirname, 'public')));

// Using routers
app.use('/users', userRouter);
app.use('/error', errorRouter);
app.use(homeRouter);

app.use((req, res) => {
	res.status(302).redirect('/error');
});

app.listen(5000);

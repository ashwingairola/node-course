import express from 'express';

const app = express();

// PART 1

// app.use((_req, _res, next) => {
// 	console.log('In the first middleware!');
// 	next();
// });

// app.use((_req, _res, next) => {
// 	console.log('In the second middleware!');
// 	next();
// });

// app.use((_req, res) => {
// 	res.send({ message: 'This is the response' });
// });

// PART 2

app.use('/users', (_req, res) => {
	res.send([
		{ id: 1, name: 'Ashwin' },
		{ id: 2, name: 'Golu' }
	]);
});

app.use('/', (_req, res) => {
	res.send(`
        <h1>Welcome to my assignment!</h1>
    `);
});

app.listen(5000);

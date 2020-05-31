import express from 'express';

const router = express.Router();
const users = [];

router.get('/', (req, res) => {
	res.render('users', {
		pageTitle: 'Users',
		path: '/users',
		users
	});
});

router.post('/', (req, res) => {
	const user = { username: req.body.username };
	users.push(user);
	res.redirect('/users');
});

export default router;

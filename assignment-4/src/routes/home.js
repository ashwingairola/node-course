import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
	res.render('home', {
		pageTitle: 'Add a User',
		path: '/'
	});
});

export default router;

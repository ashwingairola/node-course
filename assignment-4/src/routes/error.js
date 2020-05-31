import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.status(302).redirect('/error/page-not-found');
});

router.get('/page-not-found', (req, res) => {
	res.status(404).render('404', { pageTitle: 'Page Not Found', path: '' });
});

export default router;

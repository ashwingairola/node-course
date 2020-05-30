// import url from 'url';
// import path from 'path';
import express from 'express';

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/page-not-found', (_req, res) => {
	res.status(404).render('404', { pageTitle: 'Page Not Found' });
	// res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
});

export default router;

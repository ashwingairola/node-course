import url from 'url';
import path from 'path';
import express from 'express';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/page-not-found', (_req, res) => {
	return res
		.status(404)
		.sendFile(
			path.join(__dirname, '..', '..', 'views', 'page-not-found.html')
		);
});

export default router;

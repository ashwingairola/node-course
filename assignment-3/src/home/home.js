import url from 'url';
import path from 'path';
import express from 'express';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', (_req, res) => {
	res.sendFile(path.join(__dirname, '..', '..', 'views', 'home.html'));
});

export default router;

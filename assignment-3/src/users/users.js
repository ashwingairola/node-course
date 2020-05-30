import url from 'url';
import path from 'path';
import express from 'express';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/add-user', (_req, res) => {
	res.sendFile(path.join(__dirname, '..', '..', 'views', 'add-user.html'));
});

router.post('/add-user', (req, res) => {
	console.log(req.body);
	res.redirect('/');
});

export default router;

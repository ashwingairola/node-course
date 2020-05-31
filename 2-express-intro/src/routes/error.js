import express from 'express';

import { ErrorController } from '../controllers/error.js';

const router = express.Router();

router.get('/page-not-found', ErrorController.get404);

export default router;

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => { res.render('menu.html'); });

export default router;
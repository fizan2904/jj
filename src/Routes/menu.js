import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import config from './../../config';

const router = express.Router();
const CommentModel = mongoose.model('comment');

router.get('/', async (req, res) => {
	const UserDetails = await axios.get(`https://graph.facebook.com/v2.11/me?access_token=${config.access_token}`);
	res.render('menu.html', {data: UserDetails.data}); });

export default router;
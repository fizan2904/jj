import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import config from './../../config';

const router = express.Router();
const CommentModel = mongoose.model('comment');

router.get('/', async (req, res) => {
	try{
		const UserDetails = await axios.get(`https://graph.facebook.com/v2.11/me?access_token=${config.access_token}`);
		return res.render('UserDetails.html', {data: UserDetails.data});
	}catch(e){
		console.log(e);
		return res.status(500).send('Internal server error')
	}
});

export default router;
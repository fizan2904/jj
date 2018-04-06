import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import config from './../../config';
import pd from 'paralleldots';

pd.apiKey = '44bFe2TKTF4VOxljIE9lHwpmIDS0z2WmrLPLB3qNm5M';

const router = express.Router();
const CommentModel = mongoose.model('comment');

router.get('/', async (req, res) => {
	try{
		let comments = await CommentModel.findOne({ access_token: config.access_token }).exec();
		comments = comments.comments;
		let emotions=[], data;
		for(let i=0;i<comments.length;i++){
			if(comments[i] !== ''){
				data = await pd.emotion(comments[i],"en");
				data = JSON.parse(data);
				emotions.push(data.emotion.emotion);
			}
		}
		let ems = {
			Happy: 0,
			Sarcasm: 0,
			Sad: 0,
			Angry: 0,
			Fear: 0,
			Bored: 0,
			Excited: 0
		}
		for(let i=0;i<emotions.length;i++){
			ems[emotions[i]] += 1;
		}
		return res.render('showGraphs.html', { data: ems });
	}catch(e){
		return res.status(500).send('Internal server error');
	}
});

export default router;
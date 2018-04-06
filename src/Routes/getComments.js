import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import config from '../../config';

const router = express.Router();
const CommentModel = mongoose.model('comment');

const getComms = async id => {
	return new Promise(async (resolve, reject) => {
		try{
			const data = await axios.get(`https://graph.facebook.com/v2.11/${id}?fields=comments&access_token=${config.access_token}`)
			if(typeof data.data.comments !== 'undefined'){
				if(typeof data.data.comments.data !== 'undefined' && data.data.comments.data.length >= 0){
					let temp = [];
					for(let i=0;i<data.data.comments.data.length;i++){
						console.log(data.data.comments.data[i].message)
						temp.push(data.data.comments.data[i].message);
					}
					return resolve(temp);
				}else{
					return resolve('');
				}
			}else{
				return resolve('')
			}
		}catch(e){
			return reject(e);
		}
	});
}

router.get('/', async (req, res) => {
	let photoIds = [];
	let photoComments = [];
	let comments = await axios.get(`https://graph.facebook.com/v2.11/me/photos?type=uploaded&access_token=${config.access_token}`);
	comments.data.data.forEach(el => photoIds.push(el.id));
	while(typeof comments.data.paging.next === 'string'){
		comments = await axios.get(`${comments.data.paging.next}`);
		comments.data.data.forEach(el => photoIds.push(el.id));
	}
	for(let i=0;i<photoIds.length;i++){
		photoComments.push({
			photoId: photoIds[i],
			comments: await getComms(photoIds[i])
		});
	}
	let temp = [];
	for(let i=0;i<photoComments.length;i++){
		temp.push(photoComments[i].comments)
	}
	const newComments = new CommentModel({
		access_token: config.access_token,
		comments: temp
	});
	await newComments.save();
	return res.render('getComments.html', { data: photoComments });
});

export default router;
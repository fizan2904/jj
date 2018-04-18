import express from 'express';
import fs from 'fs-extra';
import path from 'path';

const router = express.Router();

router.get('/', (req, res) => {
	res.render('getAccessToken.html');
});

router.post('/getAccessToken', async (req, res) => {
	try{
		if(await fs.pathExists(path.join(__dirname, '../../config.js'))){
			await fs.remove(path.join(__dirname, '../../config.js'));
		}
		const data = `export default { 'access_token': '${req.body.access_token}' };`;
		await fs.outputFile(path.join(__dirname, '../../config.js'), data);
		res.redirect('/menu');
	}catch(err){
		console.log(err);
		res.send('Internal server error');
	}
});

export default router;
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import ejs from 'ejs';
import path from 'path';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, '../views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/jj').then(
	() => {
		app.listen(3000, () => {
			console.log('Server started');
		});
	},
	err => {
		console.log(err);
	}
);

import Models from './Models';
import Routes from './Routes';

app.use('/getUserDetails', Routes.getUserDetails);
app.use('/getComments', Routes.getComments);
app.use('/getGraphs', Routes.getGraphs);
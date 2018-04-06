import mongoose from 'mongoose';

mongoose.model('comment',
	mongoose.Schema({
		comments: [String],
		access_token: String
	}, {
		timestamps: true
	})
);
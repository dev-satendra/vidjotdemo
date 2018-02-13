const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const IdeaSchema  = new Schema({
	title : {
		type : String,
		requied: true
	},
	description : {
		type : String,
		require : true
	},
	userId : {
		type : String,
		require : true
	},
	date : {
		type : Date,
		default : Date.now
	}
})

mongoose.model('idea', IdeaSchema);

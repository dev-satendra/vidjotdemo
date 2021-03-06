const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema  = new Schema({
	name : {
		type : String,
		requied: true
	},
	email : {
		type : String,
		require : true
	},
	password : {
		type : String,
		require : true
	},
	date : {
		type : Date,
		default : Date.now
	}
})

mongoose.model('users', userSchema);

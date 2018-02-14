if(process.env.NODE_ENV == 'production'){
	module.exports = { dburl : 'mongodb://localhost:27017/vidjot' };
}else{
	module.exports = { dburl : 'mongodb://localhost:27017/vidjot' }; 	
}
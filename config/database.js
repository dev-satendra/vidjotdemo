if(process.env.NODE_ENV == 'production'){
	module.exports = { dburl : 'mongodb://sandy:sandy@ds235418.mlab.com:35418/vidjot' };
}else{
	module.exports = { dburl : 'mongodb://localhost:27017/vidjot' }; 	
}
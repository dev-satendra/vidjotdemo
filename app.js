const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();
const port = process.env.PORT || 8089;
const db = require('./config/database');
ideaRoutes = require('./routes/ideas');
userRoutes = require('./routes/users');
app.engine('handlebars', exphbs({
	defaultLayout : 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mysecret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use(flash());
app.use((req, res, next) => {
	res.locals.success_msg =  req.flash('success_msg');
	res.locals.error_msg =  req.flash('error_msg');
	res.locals.error =  req.flash('error');
	res.locals.errors =  req.flash('errors');
	res.locals.user = req.user || null;
	next();
});
mongoose.connect(db.dburl,{
	//useMongoClient : true
}).then( () => console.log("Connected to mongodb......."))
.catch( (err) => console.log(err));

app.get('/', (req,res) => {
	res.render('index',{
		title : 'index'
	});
});
app.use('/ideas', ideaRoutes);
app.use('/user', userRoutes);
app.get('/about', (req,res) => {
	//console.log(req);
	res.render("about", {
		title : 'about'
	});
});

app.listen(port, () => {
	console.log('Server started on port '+ port);
})

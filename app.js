const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');

const app = express();

// Bring in model
let User = require('./models/user');

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Mongo DB
const uri = 'mongodb://ralf1968:mongodb1968@rgcluster-shard-00-00-fml6r.mongodb.net:27017,rgcluster-shard-00-01-fml6r.mongodb.net:27017,rgcluster-shard-00-02-fml6r.mongodb.net:27017/test?ssl=true&replicaSet=RGCluster-shard-0&authSource=admin&retryWrites=true'

mongoose.connect(uri, { useNewUrlParser: true });
let db = mongoose.connection;

// Check connection to db
db.once('open', () => {
	console.log('Connected to database ...');
});

// Check for db error or errors
db.on('error', () => {
	console.log(err);
});

// Global vars
app.use((req, res, next) => {
	res.locals.errors = null;
	next();
});

// express validator middleware
app.use(expressValidator()); 

app.get('/', (req, res) => {
	User.find({}, (err, users) => {
		if(err) {
			console.log(err);
		} else {
			console.log(users[0]);
			res.render('index', {
				title: 'Customers',
				users: users
			});
		}
	});
});

app.post('/users/add', (req, res)=>{
	
	req.checkBody('first_name', 'First Name ist required, asshole!').notEmpty();
	req.checkBody('last_name', 'Last Name ist required, dumbass!').notEmpty();
	req.checkBody('email', 'Email ist required, motherfucker!').notEmpty();

	let errors = req.validationErrors();

	if(errors) {
		res.render('index', {
			title: 'Customers',
			users: users,
			errors: errors,
		});
	} else {
		let newUser = new User( {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email, 
		});

		console.log('New User: ', newUser);
		newUser.save( (err, result) => {
			if(err){
				console.log('Fehler: ', err)
			} else {
				res.redirect('/');
			}
		});
	}
});

app.listen(3000, () => {
  console.log('Sever started at Port 3000');
})
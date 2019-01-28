const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');

const app = express();


// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Global vars
app.use((req, res, next) => {
	res.locals.errors = null;
	next();
});

// express validator middleware
app.use(expressValidator()); 

let users = [
	{
		id: 1,
		first_name: 'John',
		last_name: 'Doe',
		email: 'john@doe.com'
	},
	{
		id: 2,
		first_name: 'Jane',
		last_name: 'Smith',
		email: 'jane@gmail.com'
	},
	{
		id: 3,
		first_name: 'Ralf',
		last_name: 'Graef',
		email: 'ralf@graef.com'
	},
]

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Customers',
		users: users,
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
		let newUser = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email, 
		}
		console.log('SUCCESS')
	}
});

app.listen(3000, () => {
  console.log('Sever started at Port 3000');
})
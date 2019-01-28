const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

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
	let newUser = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email, 
	}

	console.log(newUser);

});

app.listen(3000, () => {
  console.log('Sever started at Port 3000');
})
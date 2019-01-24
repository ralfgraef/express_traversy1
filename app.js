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


app.get('/', (req, res) => {
	let title = 'Customers';
	res.render('index', {
	});
});

app.listen(3000, () => {
  console.log('Sever started at Port 3000');
})
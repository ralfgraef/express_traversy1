const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

/* const logger = (res, req, next) => {
	console.log('Logging...');
	next();
}

app.use(logger); */

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.send('Hello from Ralf');
});

app.listen(3000, () => {
  console.log('Sever started at Port 3000');
})
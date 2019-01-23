const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
	res.send('Hello World from Ralf');
});

app.listen(3000, () => {
  console.log('Sever started at Port 3000');
})
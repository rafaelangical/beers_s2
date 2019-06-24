const express = require('express');
const logger = require('morgan');
const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3333;

app.set('secretKey', 'nodeRestApi'); // jwt secret token
// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cors())

// for parsing json
app.use(
  bodyParser.json({
    limit: '20mb'
  })
)

// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  })
)

app.get('/', function(req, res){
  res.json({ "Error" : "Route not found" });
});

// public route
app.use('/user', users);

// express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// handle 404 error
app.use(function(req, res, next) {
	let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else	
    res.status(500).json({message: "Something looks wrong :( !!!"});

});

app.listen(port, function(){
	console.log(`Node server listening on port ${port}`);
});

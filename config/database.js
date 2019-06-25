//Set up mongoose connection
console.log('in db config');
const mongoose = require('mongoose');
//const mongoDB = 'mongodb://localhost/nodeapi';
const mongoDB = 'mongodb+srv://rafael:995400566@cluster0-qsfxb.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = mongoose;
/*const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));*/
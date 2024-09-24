// Using Node.js `require()`
const mongoose = require('mongoose');
require('dotenv').config();

// define the MongoDB connection URL
// const mongoURL = 'mongodb://localhost:27017/hotels'
const mongoURL =  process.env.MONGODB_URL;
//setup the connection between mongoDB
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


// db is object
// db is intrect with the database 
const db = mongoose.connection; 
// Define event listeners for database connection
//connected,error,disconnected is event listner keywords
db.on('connected',() => {
  console.log('Connect to the MongoDB server')
})
db.on('error',(error) => {
  console.log('Find Some Error',error);
  })
 db.on('disconnected',() => {
  console.log('Disconnected to mongodb Server');
})

module.exports = db;  



 





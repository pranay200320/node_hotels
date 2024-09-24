  const express = require('express')
const app = express()

const db = require('./db'); 



const MenuItem = require('./models/MenuItem')
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());  // use req.body



app.get('/', function (req, res) {
  res.send('Welcome to My Hotel')
})
  
  //import person Data

  const personRoutes= require("./routes/personRoutes")
  app.use('/person',personRoutes)

  //menuData
  const menuData = require("./routes/menuRoutes")
  app.use("/menu",menuData)

  
app.listen(3001,()=>{
    console.log("THe Port Run Done");    
})  
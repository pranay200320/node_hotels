const express = require('express')
const app = express()

const db = require('./db'); 
require('dotenv').config();
const Person = require('./models/Person');

const menuData = require("./routes/menuRoutes");

//passport
const passport = require('passport')
//local-passport
const LocalStrategy = require('passport-local').Strategy;


const bodyParser = require('body-parser'); 
app.use(bodyParser.json());  // use req.body
const PORT = process.env.PORT || 3001;


//MiddelWare 

const logRequest = (req,res,next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);

  next(); 

}

// MiddelWare is use in all link

app.use(logRequest)


passport.use(new LocalStrategy(async (username, password, done) => {
  //authentication logic here
  // try{
  //    console.log("Received Credentials:", username,password);
  //    const user = await Person.findOne({username: username});
  //     if(!user)
  //       return done(null,false, {message: "Incorrect UserName"})

  //     //before use of bycrypt
  //     // const isPasswordMatch = user.password === password ? true: false;

  //     const isPasswordMatch = user.comparePassword(password);      
  //     if(isPasswordMatch){
  //       return done(null,user);

  //     }
  //     else{
  //       return done(null,false, {message: "Incorrect Password"});
  //     }
        

     
  // }
  // catch(err){
  //   return done(err)
    
  // }

  try {
    // console.log('Received credentials:', username, password);
    const user = await Person.findOne({ username });
    if (!user)
        return done(null, false, { message: 'Incorrect username.' });
    
    const isPasswordMatch = await user.comparePassword(password);
    if (isPasswordMatch)
        return done(null, user);
    else
        return done(null, false, { message: 'Incorrect password.' })
} catch (error) {
    return done(error);
}
}));

app.use(passport.initialize());

// we can use like the
// app.get('/',passport.authenticate('local',{session:false}), (req, res) => {
//   res.send('Welcome to My Hotel')
// })


const localAuthMiddleware = passport.authenticate('local',{session:false});

app.get('/', (req, res) => {
  res.send('Welcome to My Hotel')
})
  
  //import person Data

  const personRoutes= require("./routes/personRoutes")
  app.use('/person',localAuthMiddleware,personRoutes)

  //menuData
  app.use("/menu",menuData)

  // comment add to connection perpose
app.listen(PORT,()=>{

  console.log("THe Port Run Done");    
})  
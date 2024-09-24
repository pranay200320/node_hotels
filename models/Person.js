const mongoose = require('mongoose')

 //Define the Person Shchema

 const personSchema = new mongoose.Schema({
    name:{
        // mongoos all to diffren parameter 
        type:String,
        required:true
    },
    age:{
        type:Number ,
        
    },
    work:{
        type:String,
        enum:['owner','waiter','manager'],
        required:true
    },
    mobile:{
        type:String
        
    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    address:{
        type:String
      
    },
    salary:{
        type:Number
      
        
    }
 })

 // Create Person Model
 const Person = mongoose.model('Person',personSchema);
 module.exports = Person; 
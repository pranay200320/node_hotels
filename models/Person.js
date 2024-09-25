const mongoose = require('mongoose')

const bcrypt = require('bcrypt');
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
        type:String,
        required:true
        
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
        type:Number,
        required:true
         
        
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
 });
 personSchema.pre('save',async (next) =>{
    const  person = this;

    if(!person.isModified('password')) return next();

    try{
        // hash password genretion
        const salt = await bcrypt.genSalt(10)

        //hash password 

        const hashedPassword = await bcrypt.hash(person.password,salt)
        person.password = hashedPassword


      next();
    }
    catch(err){
        next(err);
    
    }
 })

 personSchema.method.comparePassword = async (candidatePassword) =>{
    try{
   const isMatch = await bcrypt.compare(candidatePassword,this.password)
   return isMatch;
    }
    catch(err){
        throw err;
    }
 }


 // Create Person Model
 const Person = mongoose.model('Person',personSchema);
 module.exports = Person; 
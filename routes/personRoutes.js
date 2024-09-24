const express = require('express')
const routers = express.Router();
const Person = require('../models/Person')

//  Router Data

routers.post('/',async (req,res) => {
    try {
      
    const data = req.body

    const newPerson = new Person(data)

    const response = await newPerson.save()
    console.log('data saved')
    res.status(200).json(response)
    
    }
    catch(error){
      console.log(error)
      res.status(500).json({error:'Internal Server ERROR'})
    }
  })


  // get METHOD

  routers.get('/', async (req, res) => {
    try {
           const data = await Person.find()
           console.log('All Data REACIVED')
           res.status(200).json(data)

    }
    catch(err){
      console.log(err)
      res.status(500).json({error:'Internal Server ERROR'}) 
    }
  })

  //Premetrized Api

  routers.get('/:workType',async (req,res)=>{
    try{
// Define The WorkType  
      const workType = req.params.workType;
      if(workType === 'owner' || workType === 'waiter' || workType === 'manager')
      {
                    const response = await Person.find({work:workType});
                    console.log("The Data Was Fatched")
                    res.status(200).json(response)
      }
      else{
               res.status(500).json({error:"The Data Is Invalid"})
      }
    }
    catch(error){
      console.log(error)
      res.status(500).json({error:'Internal Server ERROR'})
    }
  })
  //put method
  routers.put('/:id', async (req,res)=>{
    try{
      const personId = req.params.id;
      const updatePersonData = req.body;
      const response = await Person.findByIdAndUpdate(personId, updatePersonData,{
        new:true,
        runValidators:true,
      })
      if(!response){
        return res.status(404).json({error:"Person Is Not Found"})
      }
      console.log("Update Data")
      res.status(200).json(response)
    } 
    catch(err){
      console.log(err)
      res.status(500).json({error:'Internal Server ERROR'})
    }
  })

  routers.delete("/:id", async (req,res)=>{
      try{
             const personId = req.params.id;
            
             const response =  await Person.findByIdAndDelete(personId)
             if(!response){
              return res.status(404).json({error:"Person Is Not Found"})
            }
            console.log("Delete Data")
            res.status(200).json(response)
      }
      catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server ERROR'})
      }
  })

  // add comment
  module.exports = routers;
  


  
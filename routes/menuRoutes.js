
const express = require('express')
const menuData = express.Router();

const MenuItem = require('../models/MenuItem')


menuData.get('/', async (req, res) => {
    try {
           const data = await  MenuItem.find()
           console.log('All Data REACIVED')
           res.status(200).json(data)

    }
    catch(err){
      console.log(err)
      res.status(500).json({err:'Internal Server ERROR'}) 
    }
  })


  
  


  //MeniItem DATA pERSON data save

  menuData.post('/',async (req,res) => {
    try {
      
    const data = req.body

    const newMenu  = new MenuItem  (data)

    const response = await newMenu.save()
    console.log('data saved')
    res.status(200).json(response)
    
    }
    catch(error){
      console.log(error)
      res.status(500).json({error:'Internal Server ERROR'})
    }
  }) 


  // define the menu type 
  // Define The WorkType  
  menuData.get('/:menuWorkType',async (req,res)=>{
  try{
  const menuWorkType = req.params.menuWorkType;
  if(menuWorkType === 'spicy' || menuWorkType === 'tiny' || menuWorkType === 'medium'  || menuWorkType === 'super hot')
  {
                const response = await MenuItem.find({taste:menuWorkType});
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

  
  
  module.exports = menuData
  
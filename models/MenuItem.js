const mongoose = require('mongoose')

const menuItemesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true

    },
    taste:{
        type:String,
        required:true,
        enum:["spicy","medium","tiny","super hot"]
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0,
    }


    
})
 
const MenuItem = mongoose.model('MenuItem',menuItemesSchema)
module.exports = MenuItem;
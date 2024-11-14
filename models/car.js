const mongoose=require("mongoose");
const carSchema=new mongoose.Schema({
    carname:{
        type:String,
        required:true
    },
    brand:{
        type:String
    },
    category:{
        type:String
    },
    price:{
        type:Number
    },
    fuelType:{
        type:String,
    },
    type: {
        type: String,
        enum: ['manual', 'automatic', 'semiautomatic'],
    },
    images: {
        type: [String], // Array of image URLs
    },
    features:{
        type:[String]
    }

})

module.exports=mongoose.model("Car",carSchema);
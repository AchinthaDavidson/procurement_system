const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const productSchema=new Schema({
    
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
    },
    supplier_id:{
        type: String,
        required: true
    },
  

  
    
})
const product = mongoose.model("product",productSchema);

module.exports=product
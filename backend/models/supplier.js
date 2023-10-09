const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const supplierSchema=new Schema({
    
    company:{
        type: String,
        required: true
    },
    contact:{
        type: Number,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },

  
    
})
const supplier = mongoose.model("supplier",supplierSchema);

module.exports=supplier
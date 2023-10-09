const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const managerSchema=new Schema({
    
    name:{
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
const sitemanager = mongoose.model("sitemanager",managerSchema);

module.exports=sitemanager
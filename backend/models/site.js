const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const siteSchema=new Schema({
    
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
    },
    managerId:{
        type: String,
        required: true
    },

  
    
})
const site = mongoose.model("site",siteSchema);

module.exports=site
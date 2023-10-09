const mongoose= require('mongoose');
const Schema=mongoose.Schema;
const orderSchema=new Schema({
    
    item: {
        type: String,
        required: true

    },
    qty:{
        type: String,
        required: true
    },
    siteid:{
        type: String,
        required: true
    },
    supplierid:[],
    status: {
        type: String,

    },
   
    
})
const order = mongoose.model("order",orderSchema);

module.exports=order
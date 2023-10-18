const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchema = new Schema({

  message: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true
  },
  reply: {
    type: String,
    required: true
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  read:{
    type:Boolean,
    default:false
  }

});

const chat = mongoose.model("chat", chatSchema)
module.exports = chat;
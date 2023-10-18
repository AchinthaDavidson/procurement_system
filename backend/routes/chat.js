const router = require("express").Router();
const chat = require("../models/chat");
//const User = require('../models/user.model');

router.route('/').get(async (req, res) => {
  try {
    
    const messages = await chat.find()

    // Send the messages back to the client
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint for customers to send a message to the admin
router.post('/', async (req, res) => {

  const {message, sender,  reply, createdAt } = req.body;

  try {
    const newMessage = new chat({
    
      message: message,
      sender: sender,
      reply: reply,
      createdAt: createdAt
    });

    await newMessage.save();

    // Send the message back to the client
    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.route("/delete/:id").delete(async (req, res) => {

  let fid = req.params.id;

  await chat.findByIdAndDelete(fid).then(() => {
      res.status(200).send({ status: "FAQ delete" });
  }).catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Failed to delete FAQ" });
  })
})

router.put('/update', async (req, res) => {
  try {
    const { sender, reply } = req.body;
    await chat.updateMany({ sender:sender, reply: reply }, { read: true });
    res.json({ success: true, message: 'Read status updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to update read status' });
  }
});

router.get('/admin', async (req, res) => {
  try {
    const receiverId = req.query.receiver;
    const messages = await chat.find({ reply: receiverId });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch message data' });
  }
});

  module.exports = router;
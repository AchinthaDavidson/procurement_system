const { body } = require("express-validator");
const {  validate } = require("../utils/validator");
const jwt = require('jsonwebtoken');
const router = require("express").Router();
const Sitemanager=require("../models/sitemanager")
const { createPasswordHash, validatePassword } = require("../service/hash.service");





// ADD coustomer
router.route("/add").post(validate([
    body("email").isEmail(),
]),async (req,res)=>{
    const name =req.body.siteManagerName
    const contact=req.body.contactNumber
    const email =req.body.email
    const password1 =req.body.password
    const password= await createPasswordHash(password1);


    const newsitemanager =new  Sitemanager({
        name,
        contact,
        email,
        password,
    })
    console.log(password1)
    newsitemanager.save().then(()=>{
        res.json("save details")
    }).catch((err)=>{
        console.log(err);
    })
})


router.route("/").get((req,res)=>{
  Sitemanager.find().then((sitemanagers)=>{
      res.json(sitemanagers)
  }).catch((err)=>{
      console.log(err)
  })
})

router.route("/login").post(validate([
    body("email").isEmail(),
]),async (req,res)=>{
   
  
    const email =req.body.email
    const password =req.body.password

    try {
        const sitemanager = await Sitemanager.findOne({ email });
        console.log("hi")
        if (!sitemanager) {
          return res.status(401).json({ error: 'Authentication failed. User not found' });
        }
    
        const passwordMatch = await validatePassword(password,sitemanager.password);
    
        if (passwordMatch) {
          const token = jwt.sign({ id: sitemanager._id }, 'supplierlog', { expiresIn: '1h' });
          return res.status(200).json({ message: sitemanager, token});
        } else {
          return res.status(401).json({ error: 'Authentication failed. Incorrect password' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Authentication failed' });
      }
   

 
})


/* update */
router.route("/update/:id").put(async(req,res)=>{

  let Id = req.params.id;

  

 
  const name  = req.body.name;
  const email=req.body.email;

  const updatemanager = {name,email};  
console.log(updatemanager)
  await Sitemanager.updateOne({_id:Id},{$set:updatemanager})
  .then(()=>{
      res.status(200).send({status:"manager updated"})
  }).catch((err)=>{
      console.log(err);
      res.status(500).send({status:"manager update failed", error:err});
  })
})

module.exports=router;
const { body } = require("express-validator");
const {  validate } = require("../utils/validator");
const jwt = require('jsonwebtoken');
const router = require("express").Router();
const Supplier=require("../models/supplier")
const { createPasswordHash, validatePassword } = require("../service/hash.service");
const supplier = require("../models/supplier");





// ADD coustomer
router.route("/add").post(validate([
    body("email").isEmail(),
]),async (req,res)=>{
    const company =req.body.companyName
    const contact=req.body.contactNumber
    const email =req.body.email
    const password1 =req.body.password
    const password= await createPasswordHash(password1);


    const newsupplier =new  Supplier({
        company,
        contact,
        email,
        password,
    })
    console.log(password1)
    newsupplier.save().then(()=>{
        res.json("save details")
    }).catch((err)=>{
        console.log(err);
    })
})


router.route("/login").post(validate([
    body("email").isEmail(),
]),async (req,res)=>{
   
  
    const email =req.body.email
    const password =req.body.password
 
    try {
        const supplier = await Supplier.findOne({ email });
       
        if (!supplier) {
          return res.status(401).json({ error: 'Authentication failed. User not found' });
        }
    
        const passwordMatch = await validatePassword(password,supplier.password);
    
        if (passwordMatch) {
          const token = jwt.sign({ id: supplier._id }, 'supplierlog', { expiresIn: '1h' });
          return res.status(200).json({ message: supplier, token});
        } else {
          return res.status(401).json({ error: 'Authentication failed. Incorrect password' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Authentication failed' });
      }
   

 
})

router.route("/").get((req,res)=>{
  supplier.find({},{company:1,}). then((supplier)=>{
      res.json(supplier)
  }).catch((err)=>{
      console.log(err)
  })
})


module.exports=router;
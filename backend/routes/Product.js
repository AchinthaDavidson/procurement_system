const { body } = require("express-validator");
const {  validate } = require("../utils/validator");
const product = require("../models/Product");
const router = require("express").Router();


router.route("/add").post(validate([
    body("qty").isNumeric(),
]),async (req,res)=>{
    const name=req.body.pname
    const price=req.body.qty
    const supplier_id=req.body.supplier_id
   


    const newproduct =new  product({
        name,
        price,
        supplier_id,
    })
  
    newproduct.save().then(()=>{
        res.json("save details")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    product.find({},{name:1}). then((product)=>{
        res.json(product)
    }).catch((err)=>{
        console.log(err)
    })
  })
  router.route("/order").get((req,res)=>{
    product.find(). then((product)=>{
        res.json(product)
    }).catch((err)=>{
        console.log(err)
    })
  })

module.exports=router;
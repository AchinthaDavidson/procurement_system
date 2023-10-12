const { body } = require("express-validator");
const {  validate } = require("../utils/validator");
const site = require("../models/site");
const router = require("express").Router();


router.route("/add").post(async (req,res)=>{
    const name=req.body.siteName
    const location=req.body.location
    const managerId=req.body.siteManagerName
    const budget=req.body.budget


    const newsite =new  site({
        name,
        location,
        managerId,
        budget,
    })
  
    newsite.save().then(()=>{
        res.json("save details")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/:userId").get((req,res)=>{
    site .find({managerId:req.params.userId}).then((site )=>{
        res.json(site )
        // console.log(site)
    }).catch((err)=>{
        console.log(err)
    })
  })

  router.route("/").get((req,res)=>{
    site .find().then((site )=>{
        res.json(site )
        // console.log(site)
    }).catch((err)=>{
        console.log(err)
    })
  })

  /* update */
router.route("/update/:id").put(async(req,res)=>{

    let Id = req.params.id;
  
    
  
   
   
    const managerId=req.body.siteManagerName
    const budget=req.body.budget

  
    const updatemanager = {managerId,budget};  
  console.log(updatemanager)
    await site.updateOne({_id:Id},{$set:updatemanager})
    .then(()=>{
        res.status(200).send({status:"manager updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"manager update failed", error:err});
    })
  })


  router.route("/delete/:id").delete(async(req,res)=>{
    
  

    await site.deleteOne({_id:req.params.id}).then(()=>{
        res.status(200).send({status:"order details deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"order details delete failed", error:err});
    })
})
module.exports=router;
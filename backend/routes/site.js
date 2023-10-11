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
        console.log(site)
    }).catch((err)=>{
        console.log(err)
    })
  })

  router.route("/").get((req,res)=>{
    site .find().then((site )=>{
        res.json(site )
        console.log(site)
    }).catch((err)=>{
        console.log(err)
    })
  })

module.exports=router;
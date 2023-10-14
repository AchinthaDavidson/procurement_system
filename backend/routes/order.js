const router = require("express").Router();
const order = require("../models/order");
const { body } = require("express-validator");
const {  validate } = require("../utils/validator");


router.route("/add").post(validate([
    body("qty").isNumeric(),
]), async (req, res) => {
    const item = req.body.item
    const qty = req.body.qty
    const siteid = req.body.siteid
    const status = "order_requerested"
    const date =new Date().toISOString();



    const newproduct = new order({
        item,
        qty,
        siteid,
        status,
        date
    })

    newproduct.save().then(() => {
        res.json("save details")
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    order.find({},{}).then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/get").get((req,res)=>{
    order.find({status:"order_requerested"}).then((orders)=>{
        res.json(orders)
    }).catch((err)=>{
        console.log(err)
    })
})

/* update */
router.route("/update/:id").put(async(req,res)=>{

    let Id = req.params.id;

    const supplierid  = req.body.data;
    const status = "processing"
// console.log(req.body.data);
    const updateorder = {supplierid};  
    const updateorder1 = {status};  

    await order.updateOne({_id:Id},{$push:updateorder}) && order.updateOne({_id:Id},{$set:updateorder1})
    .then(()=>{
        res.status(200).send({status:"categories updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"catogories update failed", error:err});
    })
})

// //count
// const  date1 =d.getMonth()+1+"-"+d.getFullYear();
// router.route("/count").get((req,res)=>{
// order.find({date:{$regex :date1 }}).count().then((orders)=>{
//         res.json(orders)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

// router.route("/sum/:id").get((req,res)=>{
// let id=req.params.id
//     order.aggregate([{$match:{date:{$regex :id}}},{$group:{_id:null ,price:{$sum:"$amout"}}}]).then((orders)=>{
//             res.json(orders)
//         }).catch((err)=>{
//             console.log(err)
//         })
//     })

// router.route("/orderId").get((req,res)=>{
//     order.find({},{order_id:1}).sort({_id:-1}).limit(1).then((orders)=>{
//         res.json(orders)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

// router.route("/delete/:id").delete(async(req,res)=>{
    
//     let Id = req.params.id;

//     await order.deleteOne({category_Id:req.params.id}).then(()=>{
//         res.status(200).send({status:"order details deleted", user : Id})
//     }).catch((err)=>{
//         console.log(err);
//         res.status(500).send({status:"order details delete failed", error:err});
//     })
// })


// /* update */
// router.route("/update/:id").put(async(req,res)=>{

//     let Id = req.params.id;

    

   
//     const Name  = req.body.name;

//     const updatemenu = {Name};  

//     await order.updateOne({_Id:Id},{$set:updatemenu})
//     .then(()=>{
//         res.status(200).send({status:"order updated"})
//     }).catch((err)=>{
//         console.log(err);
//         res.status(500).send({status:"order update failed", error:err});
//     })
// })

// router.route("/type").get((req,res)=>{
//     order.find({},{type:1,date:1}).then((orders)=>{
//         res.json(orders)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

// const  date2 =d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
// router.route("/top").get((req,res)=>{
//     order.find({date:date2 }).sort({amout:-1}).limit(10).then((orders)=>{
//         res.json(orders)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })
module.exports=router;
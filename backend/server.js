const express = require("express");
const mongoose= require("mongoose");
const bodyParser= require("body-parser");
const cors = require("cors");
const dotenv =require("dotenv");
require("dotenv").config();
mongoose.set('strictQuery', false);
const app=express();

const PORT= process.env.PORT||8090;

app.use(cors());
app.use(bodyParser.json());

const URL=process.env.MONGODB_URL;

mongoose.connect(URL, {
    
    useNewUrlParser: true
   
   
  })

const connection =mongoose.connection;
connection.once("open",()=>{
    console.log("db connect success!");
})

const order= require("./routes/order.js");
app.use("/order", order);

const supplier= require("./routes/supplier.js");
app.use("/supplier", supplier);

const product= require("./routes/Product.js");
app.use("/product", product);

const sitemanager= require("./routes/sitemanager.js");
app.use("/sitemanager", sitemanager);

const site= require("./routes/site.js");
app.use("/site", site);


app.listen(PORT,()=>{
    console.log('Sever is runing on port 8070')
})
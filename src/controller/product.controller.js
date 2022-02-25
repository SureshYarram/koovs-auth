const express=require("express")

const router= express.Router();

const Product= require("../models/product.model")
const authenticate=require("../middleware/authenticate")


router.post("",authenticate,async(req,res)=>{
    try{
        
        req.body.user_id=req.user._id
        const product=await Product.create(req.body)
        return res.send(product) 

    }
    catch(err){
        res.status(500).send(err)
    }
    
})

module.exports=router;

const User=require("../models/user.model")
var jwt = require('jsonwebtoken');


const newToken=(user)=>{
    
    return jwt.sign({user},"web14chandan");
}

const register=async(req,res)=>{
    try{
        
        //we will try to find the user with the email provided
        let user=await User.findOne({email:req.body.email})


        //if the user is found than it is an error
        if(user){
            return res.status(400).send("try with another email")
        }
        

        //if the user is not found than we will create the user with email and password provided
         user= await User.create(req.body)
        //then we will hash the password to make the password more secure

        //then we will create the token for user
        const token =newToken(user)


        //then returen the user and the token
        
        res.send({user,token})
    }catch(err){
        
        res.status(500).send(err.message)
    }
}

const login=async (req,res)=>{
    try{
        
        //we will try to find the user with email provided
        const user=await User.findOne({email:req.body.email})


        //if user is not found then return error
        if(!user){
            return res.status(400).send("user not found")
        }


        //if user is found then we will match the passwords
        const match= user.check(req.body.password)

        if(!match){
            return res.status(400).send("password not match")
        }


        //if passwords match then we will create the token
        const token=newToken(user);


        // then return the user and the token
        res.send({user, token})

    }catch(err){
        res.status(500).send(err.message)
    }
}

module.exports={register,login,newToken}
const jwt=require("jsonwebtoken")

const verifyToken=(token)=>{

    return new Promise((resolve,reject)=>{
        jwt.verify(token,"web14chandan",(err,user)=>{
            if(err)
                return reject(err)
            
            return resolve(user)
        })
    })
}

module.exports= async (req,res,next)=>{
    
    const token=req.headers.authorization.split(" ")[1]
    
    let user;
    try{
        user =await verifyToken(token)
        req.user=user.user;
        
    }catch(err){
        res.send("token err")

    }
   
    return next();
}
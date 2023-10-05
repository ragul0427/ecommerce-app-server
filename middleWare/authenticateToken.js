const jwt=require("jsonwebtoken")   

const authenticateUser=async(req,res,next)=>{
    const token = req.cookies.token; 
    console.log(token) 
    if(!token){
        res.status(401).send("no token provided");
    }else{
        jwt.verify(token,"abcd123",(err,decoded)=>{
            if(err){
                res.status(401).send("unauthorized:invalid token");
            }else{
                req.userId=decoded;
                next()
            }
        })
    }
}

module.exports=authenticateUser
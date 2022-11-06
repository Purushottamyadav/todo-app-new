const token= require("jsonwebtoken")
const {JWT_SECRET} = require("../keys")
module.exports= (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
      res.status(401).json({error:"you must be logged in"})
    }
    try{
      console.log(authorization)
      const verifyToken= token.verify(authorization,JWT_SECRET)
      console.log(verifyToken)
      req.user=verifyToken;
    }
    catch(err){
      res.json(err.message)
    }
    return next();
}
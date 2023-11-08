const { User } = require('../model/User.js') 
const jwt = require('jsonwebtoken')
exports.isAuthenticated = async (req,res,next)=>{

    //we will make sure we are login
   const {token} = req.cookies;
   //console.log(token)

   if(!token){
    return res.status(404).json({
        success:false,
        message:"Login First",
    })
   }

   const decoded = jwt.verify(token,process.env.JWT_SECRET);
   req.user= await User.findById(decoded._id);
   //res.status(200).json(req.user);
   next();
}
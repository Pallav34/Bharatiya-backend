const jwt = require('jsonwebtoken')
exports.sendcookie = (user,res,message,statusCode=200) =>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);

    res.status(statusCode).cookie("token",token,{
    }).json({
        success:true,
        message: message
    })
}
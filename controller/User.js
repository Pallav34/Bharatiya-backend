const bcrypt = require ("bcrypt");
const { User } = require("../model/User");
const { sendcookie } = require("../utils/features");


exports.createUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(409).json({
                message:"User already exist"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
         user = await User.create({
            name,
            email,
            password:hashedPassword,
        })
        sendcookie(user,res,"Registered Succesful",201);
    }catch(err){
        res.status(400).json(err)
    }
}

exports.checkUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        console.log(user);
        if(!user){
            return res.status(400).json({
                "message":"Invalid Username"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                "message":"Invalid Password"
            })
        }

        sendcookie(user,res,`Welcome Back, ${user.name}`,200)
    }catch(error){
        console.log(error);
    }
}

exports.logout = async(req,res)=>{
    res
    .cookie('token',null,{
        expires : new Date(Date.now()),
        httpOnly: true,
    })
    .sendStatus(200)
}

exports.getProfile = async(req,res)=>{
   res.status(200).json({
    success:true,
    user:req.User,
   }) 
}
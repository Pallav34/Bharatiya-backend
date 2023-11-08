require('dotenv').config();
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/User')
const blogRouter = require("./routes/Blog")
const cors = require('cors')
const cookieParser = require('cookie-parser')

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true, 
  };
//middlewares
server.use(cors(corsOptions))
server.use(express.json())
server.use(cookieParser())

server.use('/api/blogs',blogRouter.router);
server.use('/api',userRouter.router)

server.get('/',(req,res)=>{
    res.send('Server Running')
})

main().catch((err)=>console.log(err))

async function main(){
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('database connected')
}

server.listen(process.env.PORT,()=>{
    console.log('Server Started')
})
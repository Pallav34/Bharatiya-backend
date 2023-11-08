const {Blog} = require('../model/Blog')

exports.createBlog = async(req,res)=>{
    
    try{
        const blog = new Blog(req.body);
         blog.owner=req.user._id;
        const doc = await blog.save();
        res.status(201).json(doc);
    }catch(err){
        console.log(err)
        res.status(400).json(err);
    }
}

exports.fetchAllBlogs = async(req,res)=>{
    try{
        let query = Blog.find({});
        const docs = await query.exec();
        res.status(200).json(docs);
    }catch(err){
        res.status(400).json(err);
    }
}

exports.fetchBlogById = async(req,res)=>{
    const {id} = req.params;
    try{
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
    }catch(err){
        res.status(400).json(err);
    }
}

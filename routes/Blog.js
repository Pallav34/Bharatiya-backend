const express = require('express')
const { createBlog, fetchAllBlogs, fetchBlogById } = require ("../controller/Blog");
const {isAuthenticated} = require('../middlewares/auth')

const router = express.Router();
 router.post("/new",isAuthenticated,createBlog)
//router.post("/new",createBlog)
.get("/",fetchAllBlogs)
.get("/:id",fetchBlogById)

exports.router = router;
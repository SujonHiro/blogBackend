const express=require("express")
const router=express.Router()
const {createBlog,UpdateBlog,ReadBlogPost,DeleteBlog,ReadBlogPostByID}=require("../controller/blogsController")


router.post('/create',createBlog)
router.get('/read',ReadBlogPost)
router.post('/update/:id',UpdateBlog)
router.get('/delete/:id',DeleteBlog)
router.get('/readBlogById/:id',ReadBlogPostByID)


module.exports=router;
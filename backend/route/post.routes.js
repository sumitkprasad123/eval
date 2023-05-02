const express = require("express")
const {PostModel} = require("../model/post.model")
var jwt = require('jsonwebtoken');
const postRouter = express.Router()



postRouter.get("/",async(req,res) =>{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token,"keysumit") 
    try{
        if(decoded){
            const Post = await PostModel.find({"userID":req.body.userID});
            res.status(200).send(Post);
        } 
    }catch(err){
        res.send({
            "mag":"Something went wrong while getting Posts",
            "err":err.message 
        })
    }
   
})

postRouter.post("/create",async(req,res) =>{
    const payload = req.body
    console.log(payload)
    try{
        const Post = new PostModel(payload);
        await Post.save()
        res.status(200).send({"msg":"Post is created"})
    }catch(err){
        res.status(400).send({
            "mag":"Post is not created",
            "err":err.message 
        })
    }
})

// patch
postRouter.patch("/update/:id",async(req,res) =>{
    const id = req.params.id;
    const change = req.body

    const notes = await PostModel.findOne({_id:id});
    
    try{
        if(req.body.userID !== notes.userID){
            res.status(200).send({"msg":"You are not authorized"})
        }else{
            await PostModel.findByIdAndUpdate({_id:id},change);
            res.status(200).send({"msg":"Update data Successfully"})
        }
    }catch(err){
        res.status(400).send({
            "mag":"Something went wrong",
            "err":err.message 
        })
    }
})

// delete

postRouter.delete("/delete/:id",async(req,res) =>{
    const id = req.params.id;
    const notes = await PostModel.findOne({_id:id});
    console.log(notes)
    try{
        if(req.body.userID !== notes.userID){
            res.status(200).send({"msg":"You are not authorized"})
        }else{
            await PostModel.findByIdAndDelete({_id:id});
            res.status(200).send({"msg":"Delete data Successfully"})
        }
    }catch(err){
        res.status(400).send({
            "mag":"Something went wrong",
            "err":err.message 
        })
    }
})

module.exports = {
    postRouter
}
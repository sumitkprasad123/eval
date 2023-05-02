const express = require("express")

const {UserModel} = require("../model/user.model")
const userRouter = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



// user Register
userRouter.post("/register",async(req,res) => {
    const {name,email,gender,password} = req.body
    try{
        bcrypt.hash(password, 5, async(err, hash) => {
            if(err){
                res.send(`Something went wrong ${err}`)
            }else{
                const user = new UserModel({name,email,password:hash,gender})
                await user.save()
                res.send({"msg":"User register successfully"})
            }
        });
    }catch(err){
        res.send(`Something went wrong ${err}`)
    }
});

// user login
userRouter.post("/login",async(req,res) => {
    const {email,password} = req.body
    try{
       const user = await UserModel.findOne({email});
       console.log("user",user)
       if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                console.log(result)
                if(result){
                    const token = jwt.sign({ userID:user._id }, 'keysumit');
                    res.status(200).send({"msg":"User login in Successfully","token":token})
                }else{
                    res.status(200).send("wrong Credentials")
                }
            });
       }else{
        res.status(200).send("wrong Credentials")
       }
    }catch(err){
        res.status(400).send(`Something went wrong`)
    }
});

module.exports = {
    userRouter
}
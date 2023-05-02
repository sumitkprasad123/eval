const express = require("express")
const {connection} = require("./config/db")
const {auth} = require("./Middleware/auth")
const {userRouter} = require("./route/user.routes")
const {postRouter} = require("./route/post.routes")
var cors = require('cors')
const app = express();
require("dotenv").config()

app.use(express.json());
app.use(cors());

app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)



app.listen(process.env.port,async() => {
    try{
      await connection
         console.log("Connected to MongoDB successfully")
    }catch(err){
         console.log(`something went wrong ${err.message}`)
    }

    console.log(`Server is running on port ${process.env.port}`)
})
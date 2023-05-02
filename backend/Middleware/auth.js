const jwt  = require("jsonwebtoken");
require("dotenv").config()

const auth = (req,res,next) => {
    const token = req.headers.authorization;
    
    if(token){
        const decoded = jwt.verify(token,"keysumit");
        if(decoded){
            const userID = decoded.userID
            console.log(decoded)
            req.body.userID = userID
            next()
        }else{
            res.send({"msg":"Please Login First"})
        }
    }else{
        res.send({"msg":"Please Login First"})

    }
}

module.exports = {
    auth
}
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "No token provided"});
    }
    try{
        const extracted = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(extracted.id);
        if(!req.user){
            return res.status(401).json({message: "Invalid user"});
        }
        next();    
    } catch(err){
        res.status(403).json({message:"Token error", error: err.message});
    }
}

module.exports = verifyToken;
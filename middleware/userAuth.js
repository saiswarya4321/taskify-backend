const jwt = require("jsonwebtoken")
require("dotenv").config();

const authUser = (req, res, next) => {
    
    const { token } = req.cookies;
    if (!token) {
       return res.status(401).json({ message: "User not authenticated" });
    }
    try {
      const verifiedToken = jwt.verify(token, process.env.SECRET_KEY)
    if (!verifiedToken) {
       return res.status(403).json({ message: "Token verification failed" });
    }
    req.user = verifiedToken.data;
    next()  ;
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
    
}
module.exports = { authUser }
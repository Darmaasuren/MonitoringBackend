const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
    
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({message: "No token, authorization denied"});   
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({message: "Invalid token"});
    }
};


module.exports = authMiddleware;
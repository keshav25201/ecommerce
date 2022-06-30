const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    var jwtToken = req.cookies.JWT;
    if(jwtToken === undefined || jwtToken === ''){
        return res.status(401).json();
    }
    jwtToken = jwtToken.split(' ')[1];
    jwt.verify(jwtToken,process.env.SECRET_KEY,(err,user) => {
        if(err)res.json(err);
        req.user = user;
        next();
    })
}

module.exports = {verifyToken}
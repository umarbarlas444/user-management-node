const jwt = require('jsonwebtoken');
module.exports = function(req, res, next){
    const token = req.header(process.env.HEADER_FOR_AUTH);
    if(!token) return res.status(401).send('Access denied. No Token Provided');

    try{
        const decodedPayload = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decodedPayload;
        next();
    }
    catch(ex){
        console.log("Invalid token", ex);
        res.status(400).send('Invalid Token Provided');
    }
}
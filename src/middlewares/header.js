module.exports = function(req, res, next){
    // Website you wish to allow to connect
    //Change this fixed link to some variable
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL_FOR_CORS);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'x-auth-token,content-type');
    next();
}
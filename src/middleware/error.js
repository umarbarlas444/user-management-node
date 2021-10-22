module.exports = function(err, req, res, next){
    console.log("Error middleware called", err);
    next();
}
const authentication = require('../routes/authentication');
const users = require('../routes/users');
module.exports = function(app){
    app.get('/', (req, res) => {
        res.send('Welcome Home');
    });
    
    app.use('/user/auth', authentication);
    
    app.use('/users', users);
}
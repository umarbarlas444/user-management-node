require('dotenv').config();
const express =  require('express');
const app = express();
let port = process.env.PORT || 8000;
const db = require('./libraries/database');
db.init();

//Middlewares
app.use(express.json());

const helmet = require('helmet');
app.use(helmet());

const headers = require('./middleware/header');
app.use(headers);

app.get('/', (req, res) => {
    res.send('Welcome Home');
});

const authentication = require('./routes/authentication');
app.use('/user/auth', authentication);

const users = require('./routes/users');
app.use('/users', users);

app.listen(port, () => {
    console.log(`App is running at port${port}`);
})
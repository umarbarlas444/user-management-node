const mongoose = require('mongoose');

function init(){
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error('Could not connect to MongoDB...'));
}

module.exports = {
    init
}
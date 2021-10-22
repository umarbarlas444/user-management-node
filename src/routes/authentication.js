const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {User} = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email, isDeleted: false});
    if(!user) return res.status(400).send('Invalid email or password');

    const isValidPass =  await bcrypt.compare(req.body.password, user.password);
    if(!isValidPass) return res.status(400).send('Invalid username or password');

    const token = user.generateAuthToken();
    res.send(token);
})

function validate(req){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req);
}

module.exports = router;
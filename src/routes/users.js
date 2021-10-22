const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');

router.get('/', async (req, res) => {
    const {email} = req.query;
    if(email){
        const promise = User.findOne({email}).select('-password -passwordResetSecret -isPasswordResetRequested');
        promise.then(user=> {
            return res.send(user);
        }).catch(err => {
            res.status(404).send("User not found");
        })
    }else{
        res.status(400).send("Paramter missing");
    }
});

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password -passwordResetSecret');
    if(!user) return res.status(404).send("User not found")
    else res.send(user);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0]);

    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(409).send("User already registered");
    }

    user = new User(_.pick(req.body, [ 'email', 'password' ]));

    user.password = await hash(user.password);
    await user.save();

    const token = user.generateAuthToken();
    res
    .header(process.env.HEADER_FOR_AUTH, token)
    .header("access-control-expose-headers", process.env.HEADER_FOR_AUTH)
    .send(_.omit(user.toObject(), ['password']));
});

router.post('/requestPasswordChange', (req, res) => {

})

router.patch('/properties', auth, async (req, res) => {
    let user = await User.findById(req.user._id);
    if(!user) res.status(404).send("No user found");

    let query = {$set: {properties: {}}};

    for (let key in req.body) {
        if ((user.properties[key] || user.properties[key] === '') && user.properties[key] !== req.body[key]){ // if the field we have in req.body exists, we're gonna update it
            if(key === 'properties'){
                query.$set.properties[key] = req.body[key];
            }
        }
    }

    user = await User.findByIdAndUpdate(req.user._id, query, {new: true});

    const token = user.generateAuthToken();

    res
    .header(process.env.HEADER_FOR_AUTH, token)
    .header("access-control-expose-headers", process.env.HEADER_FOR_AUTH)
    .send(_.omit(user.toObject(), ['password']));

});

async function hash(plainPassword){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPassword, salt);
}

module.exports = router;
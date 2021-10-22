const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    isPasswordResetRequested: {
        type: Boolean,
        default: false,
    },
    passwordResetSecret: {
        type: String,
        default: ''
    },
    properties: {
        type: Object,
        default: {}
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, email: this.email, type: this.isLoggedIn, properties: this.properties}, process.env.SECRET_KEY);
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().min(5).max(255).required().label('Password'),
    })
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
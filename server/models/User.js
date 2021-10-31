const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const config = require('../configs/app.config');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: [6, 'minlength']
        },
        password: {
            type: String,
            required: true,
            minlength: [8, 'minlength'],
            maxlength: [16, 'maxlength']
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            minlength: [10, 'length'],
            maxlength: [10, 'length']
        },
        birthday: {
            type: Date,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: new Date().getTime() + (7*60*60*1000)
        }
    },
);

userSchema.plugin(uniqueValidator);

userSchema.methods.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function (user) {
    return jwt.sign(user, config.accessToken, { expiresIn: '15s' });
}

userSchema.methods.passwordHash = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.pre('save', async function (next) {
    this.password = await this.passwordHash(this.password);
    this.birthday = new Date(this.birthday);
    // this.createdAt = new Date(this.createdAt);
    next();
});

module.exports = mongoose.model("User", userSchema);
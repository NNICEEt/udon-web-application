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
        address: {
            mainAddress: {
                type: String,
                default: ''
            },
            district: {
                type: String,
                default: ''
            },
            province: {
                type: String,
                default: ''
            },
            postcode: {
                type: String,
                default: ''
            }
        },
        photoURL: {
            type: String
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: config.timezone
        },
        updatedAt: {
            type: Date,
            default: config.timezone
        }
    },
);

userSchema.plugin(uniqueValidator);

userSchema.methods.userInfoJSON = function () {
    return {
        username: this.username,
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        phone: this.phone,
        address: this.address,
        photoURL: this.photoURL || __basedir + '/users/user_default.png'
    }
}

userSchema.methods.genJWT = function (user) {
    const accessToken = jwt.sign(user, config.accessToken, {
        expiresIn: config.tokenExp
    })
    return accessToken;
}

userSchema.methods.passwordHash = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.pre('save', async function (next) {
    this.password = await this.passwordHash(this.password);
    this.birthday = new Date(this.birthday);
    next();
});

module.exports = mongoose.model("User", userSchema);
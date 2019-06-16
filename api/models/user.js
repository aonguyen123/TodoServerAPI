const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const userSchema = new mongoose.Schema({
    local: {
        firstName :{
            type: String,
            default: ''
        },
        lastName :{
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        password: {
            type: String,
            default: ''
        },
        isDeleted : {
            type: Boolean,
            default: false
        }
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model('user', userSchema);
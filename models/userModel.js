const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    }
},
    {timestamps: true}
);

module.exports = mongoose.model('users', userSchema)
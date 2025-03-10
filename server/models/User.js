const {Schema, model, ObjectId} = require('mongoose');

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isVerified: {type:Boolean, default: false},
    verificationCode: { type: String },
    verificationExpires: { type: Date, expires: 600 },
    diskSpace: {type: Number, default: 1024*3*10},
    usedSpace: {type: Number, default: 0},
    avatar: {type: String},
    files: [{type: ObjectId, ref: 'File'}]
});

module.exports = model('User', User)
const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator')

const  userSchema = mongoose.Schema({
    email : {type :String},
    password : {type : String}
});

userSchema.plugin(validator);

module.exports = mongoose.model('User', userSchema)
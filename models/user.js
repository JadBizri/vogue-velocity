const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {type: String, required: [true, 'First name is required']},
    lastName: {type: String, required: [true, 'Last name is required']},
    email: {type: String, required: [true, 'Email is required'], unique: [true, 'Email already exists'], lowercase: true},
    password: {type: String, required: [true, 'Password is required']}
});

//replace plain text password with hashed password before saving
userSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password')) return next();
    user.password = bcrypt.hash(user.password, 10)
    .then(hash => {
        user.password = hash;
        next();
    })
    .catch(err => next(err));
});

//compare login password with hashed password
userSchema.methods.comparePassword = function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', userSchema);
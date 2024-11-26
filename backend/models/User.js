const mongoose = require('mongoose');
const argon2 = require('argon2');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
}, { timestamps: true });


userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or it's a new user)
    if (!this.isModified('password')) return next();

    try {
        // Hash the password with Argon2
        this.password = await argon2.hash(this.password);
        next();  // Proceed with saving the user
    } catch (err) {
        return next(err);  // Handle any errors
    }
});

// Compare input password with stored hashed password
userSchema.methods.comparePassword = async function(inputPassword) {
    try {
        return await argon2.verify(this.password, inputPassword);
    } catch (err) {
        throw new Error('Error verifying password');
    }
};

module.exports = mongoose.model('User', userSchema);

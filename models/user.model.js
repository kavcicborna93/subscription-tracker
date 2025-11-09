import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'User name is required'], trim: true, minlength: 2, maxlength: 50},
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: [true, 'That email is already taken'],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
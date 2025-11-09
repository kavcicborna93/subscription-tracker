import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

export const signUp = async (req, res, next) => {
    // implement signup logic //
    // session of mongoose transaction //
    const session = await mongoose.startSession();
    // perform atomic operations - works completely or it doesnt - never half of operation //
    session.startTransaction();

    // req.body containing data from the client (POST requests) //

    try {
        // create a new user
        const {name, email, password} = req.body;

        // check if user exists //
        const existingUser = await User.findOne({ email },null,null);

        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        // Hash password for new user //
        // NEVER STORE PASSWORDS IN PLAIN TEXT!!! //
        // method
        const salt = await bcrypt.genSalt(10);
        // password + salt gives sufficient complexity while encrypting the password //
        const hashedPassword = await bcrypt.hash(password, salt);

        // append session to it, so it gets aborted if something goes wrong //
        const [newUser] = await User.create([{ name, email, password: hashedPassword }], { session });

        // attaching json web token to the user with specific id for authentication //
        const token = jwt.sign( {userId: newUser._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN} );

        await session.commitTransaction();
        await session.endSession();

        res.status(201).json({
            success: true,
            message: 'User successfully created!',
            data: {
                token,
                user: newUser
            }
        })

    } catch (error) {
        console.error(error);
        await session.abortTransaction();
        await session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    // implement signin logic //
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email },null,null);

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        // compare of hashed passwords //
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            const error = new Error("Invalid password");
            error.statusCode = 401; // unauthorized
            throw error;
        }

        const token = jwt.sign({ userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({
            success: true,
            message: 'User successfully logged in',
            data: {
                token,
                user
            }
        })
    } catch (error) {
        next(error);
    }
}

// export const signOut = async (req, res, next) => {
//     // implement signout logic //
//
// }
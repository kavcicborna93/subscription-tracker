import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({success: true, data: users});
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({success: true, data: user});

    } catch (error) {
        next(error)
    }
}

export const createUser = async (req, res, next) => {
    try {
        const user = await User.create({...req.body});

        if (!user) {
            const error = new Error('Error creating user.');
            error.status = 404;
            throw error;
        }

        res.status(201).json({message: "User successfully created", success: true, data: user});
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        // find an user and update //
        const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, runValidators: true});
        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({message: "User succesfully updated", success: true, data: user});
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        res.status(200).json({message: "User successfully deleted", success: true, data: user});
    } catch (error) {
        next(error);
    }
}
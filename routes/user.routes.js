import { Router } from 'express';
import {createUser, deleteUser, getAllUsers, getUser, updateUser} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
const userRouter = new Router();

// Path: /api/v1/users/ (GET)
userRouter.get('/', getAllUsers);

// Path: /api/v1/users/:id (GET)
userRouter.get('/:id', authorize, getUser);

// Path: /api/v1/users/ (POST)
userRouter.post('/', authorize, createUser);

// Path: /api/v1/users/:id (PUT)
userRouter.put('/:id', authorize, updateUser);

// Path: /api/v1/users/:id (DELETE)
userRouter.delete('/:id', authorize, deleteUser);

export default userRouter;
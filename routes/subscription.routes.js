import { Router } from 'express'
import authorize from "../middlewares/auth.middleware.js";
import {createSubscription, getUserSubscriptions} from "../controllers/subscription.controller.js";

const subscriptionRouter = new Router();

// Path: /api/v1/subscriptions/ (GET)
subscriptionRouter.get('/', async (req, res) => {
    res.send({ title: 'Get all subscriptions' });
})

// Path: /api/v1/subscriptions/:id (GET)
subscriptionRouter.get('/:id', async (req, res) => {
    res.send({ title: 'Get subscription details' });
})

// Path: /api/v1/subscriptions/ (POST)
subscriptionRouter.post('/', authorize, createSubscription);

// Path: /api/v1/subscriptions/:id (PUT)
subscriptionRouter.put('/:id', async (req, res) => {
    res.send({ title: 'Update subscription' });
})

// Path: /api/v1/subscriptions/:id (DELETE)
subscriptionRouter.delete('/:id', async (req, res) => {
    res.send({ title: 'Delete subscription' });
})

// Path: /api/v1/subscriptions/user/:id (GET)
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

// Path: /api/v1/subscriptions/:id/cancel (PUT)
subscriptionRouter.put('/:id/cancel', async (req, res) => {
    res.send({ title: 'CANCEL subscription' });
})

// Path: /api/v1/subscriptions/upcoming-renewals (GET)
subscriptionRouter.get('/upcoming-renewals', async (req, res) => {
    res.send({ title: 'GET upcoming renewals' });
})

export default subscriptionRouter;
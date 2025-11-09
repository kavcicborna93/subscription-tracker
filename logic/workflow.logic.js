// workflow.logic.js
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";

export const reminderLogic = async (subscriptionId) => {
    const subscription = await Subscription.findById(subscriptionId).populate("user", "name email");
    if (!subscription || subscription.status !== "active") return;

    const renewalDate = dayjs(subscription.renewalDate);

    const REMINDERS = [7, 5, 2, 1];

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, "day");
        console.log(`Sleeping until Reminder ${daysBefore} days before at ${reminderDate}`);
        console.log(`Triggering Reminder ${daysBefore} days before`);
    }
};
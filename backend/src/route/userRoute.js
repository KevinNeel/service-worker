import express from 'express';

import { validate_Register } from '../validation/validation.js';

import { register, saveSubscription } from '../controller/userController.js';

const user = express.Router();

user.post('/process-data', validate_Register, register)

user.post("/save-subscription", saveSubscription)

// user.get("/send-notification", sendNotification)


export default user
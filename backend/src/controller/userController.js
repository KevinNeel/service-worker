import { validationResult } from "express-validator";
import webPush from 'web-push'

import axios from 'axios';

//Model
import User from '../model/User.js'

//Functions
const generateRendomAge = (age) => {
    const primeNum = [2, 3, 5, 7];
    const randomIndex = Math.floor(Math.random() * primeNum.length);
    return age * primeNum[randomIndex];
};

const colorFacts = {
    Red: "Red is the color of fire and blood",
    Green: "Green is the color of nature.",
    Blue: "Blue is often associated with depth and stability.",
    Yellow: "Yellow is the color of sunshine.",
    Black: "Black is associated with power."
};

const skillMessage = [
    {
        level: '1 - 3',
        message: "You will get there, don't give up."
    },
    {
        level: '3 - 5',
        message: 'Keep Practicing.'
    },
    {
        level: '5 - 7',
        message: 'Almost there.'
    },
    {
        level: '7 - 9',
        message: 'You ara a pro!'
    }
]

const getMessage = (skillLevel) => {
    for (const { level, message } of skillMessage) {
        const [min, max] = level.split(' - ').map(Number);
        if (skillLevel >= min && skillLevel < max) {
            return message;
        }
    }
};


//Controllers
const subDatabse = [];

export const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {

        const { name,
            email,
            age,
            color,
            skill } = req.body

        //Check if the user exist
        const user = await User.findOne({ email });

        if (user) return res.status(409).json({ message: "User already exist" });

        let newUserName = name.split('').reverse().join('').toUpperCase();
        let randomAge = generateRendomAge(age)

        const newUser = await User({ name: newUserName, email, age: randomAge, color, skill });
        await newUser.save()
        console.log(newUser);

        let fact = colorFacts[newUser.color]

        let skillMessage = getMessage(newUser.skill);

        res.status(201).json({ message: "Form Submission Successfull", fact, skillMessage });

    } catch (error) {
        console.log(error);
        res.status(500).json({ messsage: 'Server Error' })
    }
}

export const saveSubscription = async (req, res) => {
    try {
        subDatabse.push(req.body);
        await webPush.sendNotification(subDatabse[0], "Welcome to the App");

        res.json({ status: "Success", message: "Subscription saved! And Message sent to push service" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ messsage: 'Server Error' })
    }
}

// export const sendNotification = async (req, res) => {
//     try {
//         await webPush.sendNotification(subDatabse[0], "Hello world");
//         res.json({ "statue": "Success", "message": "Message sent to push service" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ messsage: 'Server Error' })
//     }
// }
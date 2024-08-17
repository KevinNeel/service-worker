import { body } from "express-validator"

export const validate_Register = [
    body('name').isLength({min: 5}).withMessage('Minnimun length 5 is required').matches(/^[a-zA-Z0-9]+$/).withMessage('Must not contain special characters'),
    body('email').isEmail().withMessage('Invalid Email Type'),
    body('age').notEmpty().withMessage('Field cannot be empty').isNumeric().withMessage('Only Decimals allowed'),
    body('color').notEmpty().withMessage('Field cannot be empty'),
    body('skill').notEmpty().withMessage('Field cannot be empty'),
]

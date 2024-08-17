import { body } from "express-validator"

export const validate_Register = [
    body('name').isLength({min: 5}).withMessage('Minnimun length 5 is required').matches(/^[a-zA-Z0-9]+$/).withMessage('Must not contain special characters'),
    body('email').isEmail().withMessage('Invalid Email Type'),
    body('age').notEmpty().withMessage('Field cannot be empty').isNumeric().withMessage('Only Decimals allowed'),
    body('color').notEmpty().withMessage('Field cannot be empty'),
    body('skill').notEmpty().withMessage('Field cannot be empty'),
]

export const validate_Login = [
    body('email').isEmail().withMessage('Invalid Email Type'),
    body('password').notEmpty().withMessage('Field cannot be empty')
]

export const validate_Password = [
    body('password').isLength({ min: 6 }).withMessage('Min 6 length characters required'),
    body('newPassword').isLength({ min: 6 }).withMessage('Min 6 length characters required')
]

export const validate_Product = [
    body('prodcut_Name').notEmpty().withMessage('Field cannot be empty'),
    body('description').notEmpty().withMessage('Field cannot be empty'),
    body('quantity').isNumeric().withMessage('Only Decimals allowed'),
    body('price').isNumeric().withMessage('Only Decimals allowed'),
    body('category').notEmpty().withMessage('Field cannot be empty'),
]
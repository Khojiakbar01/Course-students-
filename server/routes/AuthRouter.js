const express = require('express')
const app = express()
const {body} =require('express-validator')

const authController = require('../controllers/authController')

const router = express.Router()
router.post('/login',
    body('username', 'Username cannot be empty').notEmpty().trim().isLength({min:5}).withMessage('Username must contain contain at least 5 characters'),
    body('password', 'Password cannot be empty').notEmpty().trim().isLength({min:6}).withMessage('Password must contain contain at least 6 characters'),
    authController.login)

router.post('/register',
    body('firstName', 'First name cannot be empty').notEmpty(),
    body('lastName', 'Last name cannot be empty').notEmpty(),
    body('username', 'Username cannot be empty').notEmpty().trim().isLength({min:5}).withMessage('Username must contain contain at least 5 characters'),
    body('password', 'Password cannot be empty').notEmpty().trim().isLength({min:6}).withMessage('Password must contain contain at least 6 characters'),
    body('email', 'Email cannot be empty').notEmpty(),
    authController.register)

router.post('/verify/:id', authController.verify)
// router.get('/verify/:id', authController.verify)
// http://localhost:7070/api/v1/verify/${params.id}

module.exports = router
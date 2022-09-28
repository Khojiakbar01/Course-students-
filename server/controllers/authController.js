const catchAsync = require('../utils/constants/catchAsync')
const appError = require('../utils/constants/appError')
const {Op} = require('sequelize')
const jsonWebToken = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {v4: uuidCode} = require('uuid');
const User = require('../models/User')
const {compare} = require("bcrypt");
const AppError = require("../utils/constants/appError");
let {sendVerificationMail} = require('../utils/emailSend/email')
const {sendVerificationSMS} = require("../utils/smsSend/sms");


const generateToken = (payload, jwtSecret, options) => {
    return new Promise((resolve, reject) => {
        jsonWebToken.sign(
            payload,
            jwtSecret,
            options, (err, token) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(token)
                }
            }
        )
    })
}


const findByUsername = async (username) => {
    const user = await User.findOne({
        where: {username: {[Op.eq]: username}}
    })
    if (user) {
        return user
    }
    return null
}

exports.register = catchAsync(async (req, res, next) => {
    const superAdmin = {
        firstName: 'Khojiakbar',
        lastName: 'Abdusamatov',
        username: 'myusername',
        password: '20030210',
        email: 'xojiakbara38@gmail.com',
        number: '+998998550844',
        verificationCode: null,
        isVerified: true,
        role: 'SUPER_ADMIN'
    }

    const admin = await User.findAll({
        where: {
            role: {[Op.eq]: 'SUPER_ADMIN'}
        }
    })


    if (admin.length === 0) {
        await User.create({...superAdmin})
    }
    //Validation
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const err = new AppError('validation error', 400)
        err.errors = validationErrors.errors;
        err.isOperational = false;
        return next(err);
    }


    // const {username, role} = req.body
    const existingUser = await findByUsername(req.body.username);

    if (existingUser) {
        return next(new appError('Login already exists', 409))
    }

    const newUser = await User.create({...req.body})

    const payload = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
    }

    const JWTSecret = process.env.SECRET_KEY
    const token = await generateToken(
        payload,
        JWTSecret,
        {
            algorithm: 'HS512',
            expiresIn: '24h'
        }
    )

    // sendVerificationMail({
    //     to: "xojiakbara37@gmail.com",
    //     subject: "Sending Email With Node js",
    //     verificationCode: newUser.verificationCode,
    //
    // })

    await sendVerificationSMS({
        to: newUser.number,
        verificationCode: newUser.verificationCode
    })

    res.json({
        status: 'success',
        message: 'Registration  successfully completed',
        error: null,
        data: {
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: newUser.role
            },
            jwt: token
        }
    })
})


exports.login = catchAsync(async (req, res, next) => {


    //Validation
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const err = new AppError('validation error', 400)
        err.errors = validationErrors.errors;
        err.isOperational = false;
        return next(err);
    }


    const {username, password} = req.body;

    const candidate = await findByUsername(username);
    if (!candidate) {
        return next(new appError('Login or password wrong', 400));
    }


    const passwordIsMatch = await compare(password, candidate.password)

    if (!passwordIsMatch) {
        return next(new appError('Login or password wrong', 400));
    }

    const payload = {
        id: candidate.id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        role: candidate.role,
    }

    //Token generation
    const JWTSecret = process.env.SECRET_KEY
    const token = await generateToken(
        payload,
        JWTSecret,
        {
            algorithm: 'HS512',
            expiresIn: '24h'
        }
    )

    res.json({
        status: 'success',
        message: 'Successful Login',
        error: null,
        data: {
            user: {
                ...payload
            },
            jwt: token
        }
    })

})


exports.verify = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const verificationCode = req.body.verificationCode;


    const candidate = await User.findOne({
        where: {
            id: {[Op.eq]: id}
        }
    })

    if (!candidate) {
        return next(new AppError('No user found with this verification code', 404))
    }
    const candidateBySMS = await User.findOne({
        where: {
            verificationCode: {[Op.eq]: verificationCode}
        }
    })
    if (!candidateBySMS) {
        return next(new AppError('Wrong verification code', 404))
    }
    if (candidate.isVerified) {
        return next(new AppError('You are verified and you can login'))
    }

    await candidate.update({isVerified: true})

    res.json({
        status: 'success',
        message: 'You are now verified and you can login',
        error: null,
        data: null
    })
})
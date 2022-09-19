const jwt = require('jsonwebtoken')
const AppError = require('../utils/constants/appError')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)

    if (!authHeader) {
        return next(new AppError('You are not authorized', 401))
    }

    const token = authHeader.slice(7)
    console.log(token)
    const user = jwt.verify(token, process.env.SECRET_KEY)

    if (!user) {
        return next(new AppError('You are not authorized', 401))
    }
    req.user = user
    next()

}
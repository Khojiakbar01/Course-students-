const express = require('express')
const app = express()
const router = express.Router();
const cors = require('cors')
const ErrorController = require('./error/ErrorController')
const AppError = require('./utils/constants/appError')
const authMiddleware = require('./middlewares/authMiddleware')

app.use(express.json())

//routes
const studentRouter = require('./routes/StudentRouter')
const courseRouter = require('./routes/CourseRouter')
const authRouter = require('./routes/AuthRouter')
const adminsRouter = require('./routes/AdminsRouter')

app.use(cors())
app.use('/api/v1/students', authMiddleware, studentRouter)
app.use('/api/v1/courses', authMiddleware, courseRouter)
app.use('/api/v1/admins', authMiddleware, adminsRouter)
app.use('/api/v1/auth', authRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`Path ${req.path} is not found`, 404))
})
app.use(ErrorController)


module.exports = app


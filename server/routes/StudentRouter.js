const express = require('express')
const app = express()
const studentController = require('../controllers/studentController')
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.route('/',)
    .get(authMiddleware,studentController.getAllStudents)
    .post(authMiddleware,
        body('First name cannot be empty').notEmpty(),
        body('Last name cannot be empty').notEmpty(),
        body('Birthday name cannot be empty or should be after 1900-01-01').notEmpty(),
        studentController.createStudent)

router.route('/:id',)
    .get(authMiddleware,studentController.getOneStudent)
    .put(authMiddleware,
        body('First name cannot be empty').notEmpty(),
        body('Last name cannot be empty').notEmpty(),
        body('Birthday name cannot be empty or should be after 1900-01-01').notEmpty(),
        studentController.updateStudent)
    .delete(studentController.deleteStudent)


module.exports = router
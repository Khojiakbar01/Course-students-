const express =  require('express')
const app =  express()
const {body} = require('express-validator')

const courseController = require('../controllers/courseController')
const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router()
router.route('/',)
    .get(authMiddleware,courseController.getAllCourses)
    .post(authMiddleware,
        body('name', 'Name cannot be empty').notEmpty(),
        courseController.createCourse)

router.route('/:id')
    .get(authMiddleware,courseController.getOneCourse)
    .put(authMiddleware,
        body('name cannot be empty').notEmpty(),
        courseController.updateCourse)
    .delete(courseController.deleteCourse)

router.route('/:id/students')
    .get(courseController.getOneCourseWithStudent)




module.exports = router
const express = require('express')
const app = express()
const {body} = require('express-validator')

const adminsController = require('../controllers/adminsController')
const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router()
router.route('/').get(authMiddleware, adminsController.getAllAdmins)

// .post(authMiddleware,
//     body('name', 'Name cannot be empty').notEmpty(),
//     courseController.createCourse)

router.route('/:id')
    .get(authMiddleware, adminsController.getById)
    .put(authMiddleware,
        body('name cannot be empty').notEmpty(),
        adminsController.updateAdmin)
    .delete(adminsController.deleteAdmin)


module.exports = router;
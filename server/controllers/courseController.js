const Course = require('../models/Courses');
const {Op} = require('sequelize')
const catchAsync = require('../utils/constants/catchAsync')
const {validationResult} = require('express-validator')
const AppError = require("../utils/constants/appError");
// const ejs = require('ejs')
// const pagination = require('../pagination/Pagination')

exports.getAllCourses = catchAsync(async (req, res, next) => {
    const {page = 1, size, search} = req.query;

    // const allCourses = await pagination(req.query, Course, {})
    const allCourses = await Course.findAndCountAll({
        offset: +size === 0 ? 0 : (page - 1) * size,
        limit: +size === 0 ? null : 3,
        // where: search && {[Op.or]: [{name: {[Op.iLike]: `%${search}% `}}, {description: {[Op.iLike]: ` %${search}% `}}]}
        where: search && {
            [Op.or]: [
                {name: {[Op.iLike]: `%${search}%`}},
                {description: {[Op.iLike]: `%${search}% `}},
            ],
        },
    })

    allCourses.totalPages = Math.ceil(allCourses.count / size) || 1

    // if (!(page <= allCourses.page) && !(size <= allCourses.count)) {
    //     return next(new AppError(`Required information (page${page}, size of information: ${size})`))
    // }
    // const allCourses = await Course.findAndCountAll()
    // allCourses.totalPages = Math.ceil(allCourses.count / size) || 0

    res.json({
        status: 'success',
        message: 'All courses found',
        data: {
            ...allCourses
        },
        pagination: {
            allPages: allCourses.totalPages,
            totalItems: allCourses.count,
            isLastPage: allCourses.totalPages === +page,
            isFirstPage: (+page - 1) === 0,
            hasNextPage: allCourses.totalPages > +page,
            page: page || 1

        }
    })
})

exports.getOneCourse = catchAsync(async (req, res, next) => {

    const {id} = req.params;
    const byId = await Course.findByPk(id);


    if (!byId) {
        return next(new AppError(`Course with id ${id} not found`))
    }
    res.status(201).json({
        status: 'success',
        message: 'Course found by ID',
        data: {byId}
    })
})

exports.getOneCourseWithStudent = catchAsync(async (req, res, next) => {
    const byIdWithStudent = await Course.findOne({
        where: {id: {[Op.eq]: req.params.id}},
        include: [
            "students"
        ]
    })


    res.status(201).json({
        status: 'success',
        message: 'Course found by ID',
        data: {byIdWithStudent}
    })
})

exports.createCourse = catchAsync(async (req, res, next) => {
    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        const err = new AppError('validation error', 400)
        err.name = 'validationError'
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }

    const newProduct = await Course.create(req.body)
    res.status(201).json({
        status: 'success',
        message: 'Course created successfully',
        data: {newProduct}
    })
})

exports.updateCourse = catchAsync(async (req, res, next) => {
    const validationErrors = validationResult(req)

    if (validationErrors.isEmpty()) {
        const err = new AppError('validation error', 400)
        err.name = 'validationError'
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }

    const {id} = req.params;
    const byId = await Course.findByPk(id);
    if (!byId) {
        return next(new AppError(`Course with id ${id} not found`))
    }

    const updatedCourse = await byId.update(req.body);
    res.json({
        status: 'success',
        message: 'Course updated successfully',
        data: {updatedCourse}
    })
})

exports.deleteCourse = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const byId = await Course.findByPk(id);
    if (!byId) {
        return next(new AppError(`Course with id ${id} not found`))
    }
    await byId.destroy()
    res.status(204).json({
        status: 'success',
        message: 'Course deleted successfully',
        data: null
    })
})

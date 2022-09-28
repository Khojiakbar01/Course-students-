const {Op} = require('sequelize')
const Student = require('../models/Student')
const Course = require("../models/Courses");
const catchAsync = require('../utils/constants/catchAsync')
const AppError = require('../utils/constants/appError')
const {validationResult} = require('express-validator')
const QueryBuilder = require('../utils/QueryBuilder')

exports.getAllStudents = catchAsync(async (req, res, next) => {
    const queryBuilder = new QueryBuilder(req.query);

    queryBuilder
        .filter()
        .paginate()
        .limitFields()
        .search(["firstName", "lastName","birthDate"])
        .sort()



    let allStudents = await Student.findAndCountAll(queryBuilder.queryOptions)
    allStudents = queryBuilder.createPagination(allStudents)

    // const {page = 1, size = 5,search} = req.query;
    //
    //
    //
    // const allStudents = await Student.findAndCountAll({
    //     offset: (page - 1) * size,
    //     limit: size,
    //     where: search && {
    //         [Op.or]: [
    //             {firstName: {[Op.iLike]: `%${search}%`}},
    //             {lastName: {[Op.iLike]: `%${search}% `}},
    //         ],
    //     },
    // })
    //
    //
    // allStudents.totalPages = Math.ceil(allStudents.count / size)

    // if (!(page <= allStudents.page) && !(size <= allStudents.count)) {
    //     return next(new AppError(`Required information (page${page}, size of information: ${size})`))
    // }

    res.json({
        status: 'success',
        message: 'All students found',
        data: {
            allStudents
        },


        // pagination: {
        //     allPages: allStudents.totalPages,
        //     totalItems: allStudents.count,
        //     isLastPage: allStudents.totalPages===+page,
        //     isFirstPage: (+page - 1) === 0,
        //     hasNextPage: allStudents.totalPages>+page ,
        //     page: page || 1
        //
        // }
    })

})
exports.getOneStudent = catchAsync(async (req, res, next) => {
    const {id} = req.params
    const byId = await Student.findByPk(id);


    if (!byId) {
        return next(new AppError(`Student with id ${id} not found`))
    }
    res.status(201).json({
        status: 'success',
        message: `Student found with id ${id}`,
        error: null,
        data: {byId}
    })
})

exports.createStudent = catchAsync(async (req, res, next) => {

    const validationErrors = validationResult(req)

    if (validationErrors.isEmpty()) {
        const err = new AppError('validation error', 400)
        err.name = 'validationError'
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }

    const newStudent = await Student.create(req.body);
    res.status(201).json({
        status: 'success',
        message: `New student created successfully`,
        error: null,
        data: {newStudent}
    })
})

exports.updateStudent = catchAsync(async (req, res, next) => {
    console.log(req.body)
    const validationErrors = validationResult(req)

    if (validationErrors.isEmpty()) {
        const err = new AppError('validation error', 400)
        err.name = 'validationError'
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }

    const {id} = req.params;
    const byId = await Student.findByPk(id);

    if (!byId) {
        return next(new AppError(`Student with id ${id} not found`))
    }
    ;

    const updatedStudent = await byId.update(req.body);
    res.json({
        status: 'success',
        message: 'Student updated successfully',
        error: null,
        data: {updatedStudent}
    })
})

exports.deleteStudent = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const byId = await Student.findByPk(id);

    if (!byId) {
        return next(new AppError(`Student with id ${id} not found`))
    }
    await byId.destroy()
    res.status(204).json({
        status: 'success',
        message: 'Student deleted successfully',
        data: null
    })
})
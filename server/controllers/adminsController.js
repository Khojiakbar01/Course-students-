const User = require('../models/User');
const {Op} = require('sequelize')
const catchAsync = require('../utils/constants/catchAsync')
const {validationResult} = require('express-validator')
const AppError = require("../utils/constants/appError");


exports.getAllAdmins = catchAsync(async (req, res, next) => {
    const {page = 1, size, search} = req.query;
    // role: {[Op.eq]: 'ADMIN'},

    const allAdmins = await User.findAndCountAll({
        offset: (page - 1) * size || 0,
        limit: size,
        where: search && {
            role: {[Op.eq]: 'ADMIN'},
            [Op.or]: [
                {firstName: {[Op.iLike]: `%${search}%`}},
                {lastName: {[Op.iLike]: `%${search}% `}},
                {email: {[Op.iLike]: `%${search}% `}}
            ]
        },
        // where:{
        //
        //     role:{[Op.eq]:'ADMIN'}
        // }

    })


    allAdmins.totalPages = Math.ceil(allAdmins.count / size) || 1
    // if (!(page <= allAdmins.page) && !(size <= allAdmins.count)) {
    //     return next(new AppError(`Required information (page${page}, size of information: ${size})`,404))
    // }
    // const allCourses = await Course.findAndCountAll()
    // allCourses.totalPages = Math.ceil(allCourses.count / size) || 0


    res.json({
        status: 'success',
        message: 'All admins found',
        data: {
            ...allAdmins
        },
        pagination: {
            allPages: allAdmins.totalPages,
            totalItems: allAdmins.count,
            isLastPage: allAdmins.totalPages === +page,
            isFirstPage: (+page - 1) === 0,
            hasNextPage: allAdmins.totalPages > +page,
            page: page || 1

        }
    })
})

exports.getById = catchAsync(async (req, res, next) => {

    const {id} = req.params;
    const byId = await User.findByPk(id);


    if (!byId) {
        return next(new AppError(`Admin with id ${id} not found`))
    }
    res.status(201).json({
        status: 'success',
        message: 'Admin found by ID',
        data: {byId}
    })
})


exports.updateAdmin = catchAsync(async (req, res, next) => {
    const validationErrors = validationResult(req)

    if (validationErrors.isEmpty()) {
        const err = new AppError('validation error', 400)
        err.name = 'validationError'
        err.errors = validationErrors.errors
        err.isOperational = false
        return next(err)
    }

    const {id} = req.params;
    const byId = await User.findByPk(id);
    if (!byId) {
        return next(new AppError(`Admin with id ${id} not found`))
    }

    const updatedAdmin = await byId.update(req.body);
    res.json({
        status: 'success',
        message: 'Admin updated successfully',
        data: {updatedAdmin}
    })
})


exports.deleteAdmin = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const byId = await User.findByPk(id);
    // console.log(byId)
    if (!byId) {
        return next(new AppError(`Admin with id ${id} not found`))
    }
    await byId.destroy()
    res.status(204).json({
        status: 'success',
        message: 'Admin deleted successfully',
        data: null
    })
})

const sequelize = require('../config/database/db')
const {DataTypes} = require('sequelize')
const Course = require('./Courses')

const Student = sequelize.define('students', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        isAfter: "1900-1-01"
    }
},{
    underscored: true,

})

Course.hasMany(Student, {as:"students"})
Student.belongsTo(Course, {as:'course'})
module.exports = Student

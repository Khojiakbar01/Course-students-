const sequelize = require('../config/database/db')
const {DataTypes} = require('sequelize')
const Student = require('./Student')

const Course = sequelize.define('course',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.TEXT
    }
},{
    underscored: true,
})


module.exports = Course
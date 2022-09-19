const sequelize = require('../config/database/db')
const {DataTypes, UUIDV4, UUIDV1} = require('sequelize')
const bcrypt = require('bcrypt')


const User = sequelize.define('users', {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {len: {args: [5], msg: 'at least five characters'}}
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {len: {args: [6], msg: 'at least six characters'}}

        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {isEmail: true}
        },
        number: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        verificationCode: {
            // type: DataTypes.UUID,
            // defaultValue: UUIDV1
            type: DataTypes.STRING,
            defaultValue: `${Math.floor(1000+Math.random() * 9000)}`,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        role: {
            type: DataTypes.ENUM('SUPER_ADMIN', 'ADMIN'),
            allowNull: false,
            defaultValue: 'ADMIN'
        }
    }, {
        underscored: true,
        hooks: {
            async beforeCreate(user) {
                user.password = await bcrypt.hash(user.password, 8)
            }
        }

    }
)

module.exports = User
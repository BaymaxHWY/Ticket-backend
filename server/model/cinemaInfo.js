const Sequelize = require('sequelize')
const sequelize = require('./index')

module.exports = sequelize.define('cinema_info', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '自增主键'
    },
    cinema_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '电影院名'
    },
    place: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '地点'
    }
}, { timestamps: false, freezeTableName: true })
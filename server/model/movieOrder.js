const Sequelize = require('sequelize')
const sequelize = require('./index')

module.exports = sequelize.define('movie_order', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '自增主键'
    },
    wechat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    cinema_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '电影院id'
    },
    movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '电影id'
    },
    is_repay: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '是否付款'
    },
    time: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '时间戳'
    },
    order_time: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: '用户下单时间'
    }
}, { timestamps: false, freezeTableName: true })
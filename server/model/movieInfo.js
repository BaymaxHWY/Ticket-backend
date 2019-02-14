const Sequelize = require('sequelize')
const sequelize = require('./index')

module.exports = sequelize.define('movie_info', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '自增主键'
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '电影名'
    },
    movie_desc: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '电影描述'
    },
    picture: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: '电影图片'
    },
    produceTime: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '电影上映时间'
    },
    type: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '电影类型'
    },
    director: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '导演'
    },
    score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '评分'
    }
}, { timestamps: false, freezeTableName: true })
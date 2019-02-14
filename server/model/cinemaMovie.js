const Sequelize = require('sequelize')
const sequelize = require('./index')
const cinema = require('./cinemaInfo')
const movie = require('./movieInfo')

const cinemaMovie = sequelize.define('cinema_movie', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '自增主键'
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '票价'
    },
    ticket_sum: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '电影票总量'
    },
    ticket_odd: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '电影票余量'
    },
    time: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '时间戳'
    }
}, { timestamps: false, freezeTableName: true })

cinemaMovie.belongsTo(cinema, {foreignKey: 'cinema_id'})
cinemaMovie.belongsTo(movie, {foreignKey: 'movie_id'})

module.exports = cinemaMovie
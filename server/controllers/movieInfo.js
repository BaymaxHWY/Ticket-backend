const movieInfo = require('../model/movieInfo')
const cinemaMovie = require('../model/cinemaMovie')

class MovieInfo {
    async getLimt(ctx) {
        let req = ctx.request.query
        req.limit = req.limit || 0
        req.page = req.page || 1
        let res = await movieInfo.findAndCount({
            offset: (req.page-1)*req.limit,
            limit: parseInt(req.limit)
        })
        ctx.body = {
            code: 20000,
            data: {items:res.rows, total:res.count}
        }
    }
    async getAll(ctx) {
        let res = await movieInfo.findAll()
        ctx.body = {
            code: 20000,
            data: {items:res}
        }
    }
    async insertOrUpdate(ctx){
        let data = ctx.request.body
        let res = await movieInfo.upsert(data)
        ctx.body = {
            code: 20000,
        }
    }
    async delete(ctx){
        let data = ctx.request.body
        let movieRes = await movieInfo.findOne({
            where:{
                id: data.id
            }
        })
        cinemaMovie.destroy({
            where:{
                movie_id: data.id
            }
        })
        movieRes.destroy()
        ctx.body = {
            code: 20000,
        }
    }
}
module.exports = new MovieInfo()

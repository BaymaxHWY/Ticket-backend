const cinemaMovie = require('../model/cinemaMovie')
const cinemaInfo = require('../model/cinemaInfo')
const movieInfo = require('../model/movieInfo')

class CinemaMovie {
    async getLimt(ctx) {
        let req = ctx.request.query
        req.limit = req.limit || 0
        req.page = req.page || 1
        let res = await cinemaMovie.findAndCount({
            offset: (req.page-1)*req.limit,
            limit: parseInt(req.limit),
            include: [ movieInfo, cinemaInfo]
        })
        ctx.body = {
            code: 20000,
            data: {items:res.rows, total:res.count}
        }
    }
    async getAll(ctx) {
        let res = await cinemaMovie.findAll()
        ctx.body = {
            code: 20000,
            data: {items:res}
        }
    }
    async insertOrUpdate(ctx){
        let data = ctx.request.body
        await cinemaMovie.upsert(data)
        ctx.body = {
            code: 20000,
        }
    }
    async delete(ctx){
        let data = ctx.request.body
        let res = await cinemaMovie.findOne({
            where:{
                id: data.id
            }
        })
        res.destroy()
        ctx.body = {
            code: 20000,
        }
    }
}
module.exports = new CinemaMovie()

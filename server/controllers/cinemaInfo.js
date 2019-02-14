const cinemaInfo = require('../model/cinemaInfo')

class CinemaInfo {
    async getLimt(ctx) {
        let req = ctx.request.query

        req.limit = req.limit || 0
        req.page = req.page || 1

        let res = await cinemaInfo.findAndCount({
            offset: (req.page-1)*req.limit,
            limit: parseInt(req.limit)
        })
        ctx.body = {
            code: 20000,
            data: {items:res.rows, total:res.count}
        }
    }
    async getAll(ctx) {
        let res = await cinemaInfo.findAll()
        ctx.body = {
            code: 20000,
            data: {items:res}
        }
    }
    async insertOrUpdate(ctx){
        let data = ctx.request.body
        let res = await cinemaInfo.upsert(data)
        ctx.body = {
            code: 20000,
        }
    }
    async delete(ctx){
        let data = ctx.request.body
        let res = await cinemaInfo.findOne({
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
module.exports = new CinemaInfo()

const router = require('koa-router')()
const movie = require('./controllers/movieInfo')
const login = require('./controllers/login')
const cinemaMovie = require('./controllers/cinemaMovie')
const cinema = require('./controllers/cinemaInfo')

// 登陆
router.post('/api/login', login.checkLogin)
router.get('/api/info', login.getInfo)
router.post('/api/logout', login.logout)

// 电影管理
router.get('/api/movie/list', movie.getLimt)
router.get('/api/movie/all', movie.getAll)
router.post('/api/movie/create', movie.insertOrUpdate)
router.post('/api/movie/delete', movie.delete)
router.post('/api/movie/update', movie.insertOrUpdate)

// 电影-影院上线
router.get('/api/movieCinema/list', cinemaMovie.getLimt)
router.post('/api/movieCinema/create', cinemaMovie.insertOrUpdate)
router.post('/api/movieCinema/delete', cinemaMovie.delete)
router.post('/api/movieCinema/update', cinemaMovie.insertOrUpdate)

// 影院管理
router.get('/api/cinema/list', cinema.getLimt)
router.get('/api/cinema/all', cinema.getAll)
router.post('/api/cinema/create', cinema.insertOrUpdate)
router.post('/api/cinema/delete', cinema.delete)
router.post('/api/cinema/update', cinema.insertOrUpdate)


router.all('/api/*', async function (ctx) {
    ctx.throw(404, '未找到相关 API')
})

module.exports = router
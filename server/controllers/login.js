class Login{
    async checkLogin(ctx){
        let req = ctx.request.body
        let token = ''
        if(req.username === 'admin'&& req.password === 'admin'){
            token = 'admin'
        }
        ctx.body = {code:20000
            , data: {token: token}}
    }

    async getInfo(ctx){
        let req = ctx.request.query
        if(req.token === 'admin'){
            ctx.body = {code:20000 , 
                data: {
                    avatar:"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
                    name:'admin',
                roles: ['admin']
            }}
        }
    }

    async logout(ctx){
        ctx.body = {code:20000}
    }
}

module.exports = new Login()
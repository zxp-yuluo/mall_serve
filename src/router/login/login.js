const router = require('koa-router')();

router.prefix('/login');

router.get('/', async ctx => {
  ctx.body = {
    status: 1,
    data: '测试',
    message: '登录成功'
  }
})

router.post('/', async ctx => {
  ctx.body = {
    status: 1,
    data: {
      name: "Tom",
      email: "tom@163.com"
    },
    message: '登录成功'
  }
})

module.exports = router
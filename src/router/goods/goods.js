const router = require('koa-router')();
const dayjs = require('dayjs');

router.prefix('/goods');
router.get('/', async ctx => {
  ctx.body = {
    status: 1,
    data: {
      name: "Apple iPhone X ",
      price: "1199.00"
    },
    message: '获取成功'
  }
})

module.exports = router
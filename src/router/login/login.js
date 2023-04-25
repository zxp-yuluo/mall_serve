require('../../api/database/connect_db')
const AdminUserModel = require('../../api/model/admin_user_model')
const router = require('koa-router')()
const md5 = require('md5')
const { generateToken, verifyToken } = require('../../token/token')

router.prefix('/login');
// 登录
router.post('/', async ctx => {
  let { username, password } = ctx.request.body.data
  // 判断用户名或密码是否为空
  if (!username || !password) {
    ctx.status = 400
    ctx.body = {
      message: '用户名或密码为空！',
      data: null
    }
    return
  }
  // 根据用户名查询用户
  const queryResult = await AdminUserModel.findOne({ username })
  // queryResult如果为空，则用户名错误
  if (!queryResult) {
    ctx.status = 400
    ctx.body = {
      message: '用户名或密码不正确！',
      data: null
    }
    return
  }
  // 判断密码是否正确
  password = md5(password)
  if (password != queryResult.password) {
    ctx.status = 400
    ctx.body = {
      message: '用户名或密码不正确！',
      data: null
    }
    return
  }
  // 登录成功
  const tempObject = {
    username: queryResult.username,
    create_time: queryResult.create_time,
    _id: queryResult._id,
  }
  const token = generateToken({ tempObject })
  ctx.body = {
    status: 1,
    data: {
      ...tempObject,
      role_name: queryResult.role_name,
      auth_time: queryResult.auth_time,
      menus: queryResult.menus
    },
    message: '登录成功',
    token,
  }
})


module.exports = router
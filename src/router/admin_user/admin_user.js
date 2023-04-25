const AdminUserModel = require('../../api/model/admin_user_model')
const router = require('koa-router')()
const md5 = require('md5')
const dayjs = require('dayjs')

router.prefix('/admin_user')
// 添加
router.post('/', async ctx => {
  let {username,password} = ctx.request.body
  // 判断用户名或密码是否为空
  if(!username || !password) {
    ctx.status = 400
    ctx.body = {
      message: '用户名或密码为空！',
      data: null
    }
    return 
  }
  // 判断用户是否存在
  const queryResult = await AdminUserModel.findOne({username})
  if(queryResult) {
    ctx.status = 400
    ctx.body = {
      message: '用户名已存在！',
      data: null
    }
    return 
  }

  // 插入用户
  const create_time = dayjs(+ new Date() + 28800000).format('YYYY-MM-DD  HH:mm:ss')
  password = md5(password)
  const insertResult = await AdminUserModel.create({username,password,create_time})
  const tempObject = {
    _id: insertResult._id,
    username: insertResult.username,
    create_time: insertResult.create_time,
    role_name: insertResult.role_name,
    auth_time: insertResult.auth_time,
    menus: insertResult.menus
  } 
  ctx.body = {
    status: 1,
    data: tempObject,
    message: '添加成功'
  }
})

module.exports = router
const mongoose = require('mongoose');

const adminUser = new mongoose.Schema({
  username: String,   // 用户名
  password: String,   // 密码
  create_time: Date,  // 创建时间
  role_name: {
    type: String,
    default: ""
  },  // 角色名
  auth_time: {
    type: Date,
    default: null
  },    // 授权时间
  menus: {
    type: Array,
    default: []
  }        // 权限数组
});

module.exports = mongoose.model('admin_user', adminUser)
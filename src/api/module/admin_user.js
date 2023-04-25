const {Schema} = require('mongoose');

const adminUser = new Schema({
  username: String,
  password: String
});

module.exports = mongoose.model('admin_user',adminUser)
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mall')
  .then(async() => {
    console.log('连接成功！')
  });
const jwt = require('jsonwebtoken')
const { secretKey, expiresIn } = require('../../config')
// 生成token
const generateToken = (data, scope) => {
  return jwt.sign(
    data,
    secretKey,
    {
      expiresIn
    }
  )
}
// 验证tokan
const verifyToken = (token) => {
  try {
    jwt.verify(token,secretKey)
    return true
  } catch (error) {
    return false
  }
}
module.exports = {
  generateToken,
  verifyToken
}
// 引入 express 模块包
var express = require('express')
// 创建路由对象
const router = express.Router()
// 引入
const file = require('./file')
const data = require('./data')

router.use('/file', file)
router.use('/data', data)

module.exports = router

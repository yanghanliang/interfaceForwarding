// 引入 express 模块包
var express = require('express')
// 创建路由对象
const router = express.Router()
// handle
const file = require('../process/file')

router.get('/image/*', (req, res) => {
    file.image(req, res)
})

module.exports = router

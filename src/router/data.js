// 引入 express 模块包
var express = require('express')
// 创建路由对象
const router = express.Router()
// handle
const { $http } = require('../process/http')

router.get('*', async (req, res) => {
    console.log('get')
    const data = await $http(req, res)
    res.send(data)
})

router.post('*', async (req, res) => {
    console.log('post')
    const data = await $http(req, res)
    res.send(data)
})

module.exports = router

// 引入 express 模块包
var express = require('express')
// 创建路由对象
const router = express.Router()
// handle
const { $http } = require('../process/http')

router.get('*', async (req, res) => {
    console.log('get')
    const data = await $http(req, res)
    console.log(data, ';data')
    res.send(data)
})

router.post('*', async (req, res) => {
    console.log('post')
    const data = await $http(req, res)
    // console.log(data, 'gggg')
    res.send(data)
})

router.put('*', async (req, res) => {
    console.log('put')
    const data = await $http(req, res)
    console.log(data, ';data')
    res.send(data)
})

router.delete('*', async (req, res) => {
    console.log('delete')
    const data = await $http(req, res)
    res.send(data)
})

module.exports = router

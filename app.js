// 引入express 第三方包
const express = require('express')

// 引入获取数据的第三方包(post)
const bodyParser = require('body-parser')

// 创建 app 对象
const app = express()

const router = require('./src/router/index')

// 提供跨域(CORS)
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    // res.header('Access-Control-Allow-Headers', 'application/x-www-form-urlencoded,Origin,X-Requested-With,Content-Type,Accept,Authorization,token')
    res.header('Access-Control-Allow-Credentials','true')
    next()
}

// 使用跨域设置
app.use(allowCrossDomain)

// 使用第三方包获取参数
// 编码问题(请求报文中Content-Type: application/json;charset=UTF-8时需加)
app.use(bodyParser.json())
// res.header('Access-Control-Allow-Headers', 'application/x-www-form-urlencoded')
app.use(bodyParser.urlencoded({ extended: false }))

// 访问静态文件（图片,如果不设置的话，就找不到图片
// app.use('/assets', express.static('/assets'))

app.use('/', (req, res, next) => {
    if (req.headers['sec-fetch-dest'] === 'image') {
        req.url = `/file/image${req.url}`
        console.log(req.url, 'req.url')
    }

    req.url = `/data${req.url}`

    console.log(req.url, 'slkjdsalkdalsm')
    next()
})

// 使用路由
app.use(router)

// 开启服务器的监听
app.listen(10000, () => console.log('Example app listening on port 10000!'))

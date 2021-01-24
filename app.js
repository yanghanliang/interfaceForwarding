// 引入express 第三方包
const express = require('express')
const http = require("http");

// 引入获取数据的第三方包(post)
const bodyParser = require('body-parser')

// axios 请求
const axios = require('axios')

const fs = require('fs');

// 创建 app 对象
const app = express()

const channelFile = require('./process/channelFile')

// 提供跨域(CORS)
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    // res.header('Access-Control-Allow-Headers', 'application/x-www-form-urlencoded,Origin,X-Requested-With,Content-Type,Accept,Authorization,token')
    res.header('Access-Control-Allow-Credentials','true')
    next()
}

let router = express.Router()
// 使用跨域设置
app.use(allowCrossDomain)

// 使用第三方包获取参数
// 编码问题(请求报文中Content-Type: application/json;charset=UTF-8时需加)
app.use(bodyParser.json())
// res.header('Access-Control-Allow-Headers', 'application/x-www-form-urlencoded')
app.use(bodyParser.urlencoded({ extended: false }))

// 访问静态文件（图片,如果不设置的话，就找不到图片
app.use('/assets', express.static('/assets'))

app.use('/', async (req, res, next) => {
    console.log(req.url, '10000', req.method)
    console.log(req.body, 'req.body')
    // console.log(req, 'req')
    const params = {
        data: req.body,
        params: req.body,
        query: req.query,
        // 如果不设置这个的话，图片是受损的 json || default
        responseType: req.headers['sec-fetch-dest'] === 'image' ? 'arraybuffer' : ''
    }
    let postData = {
        method: req.method,
        url: `http://localhost:3001${req.url}`,
    }
    for (const key in params) {
        const item = params[key]
        if (item) {
            postData[key] = item
        }
    }
    console.log(postData, 'postData')
    const data = await axios(postData)
    // console.log(data, 'data')

    if (req.headers['sec-fetch-dest'] === 'image') {
        // res.send(Buffer.from(data.data, 'binary'))
        // var dataBuffer = new Buffer(base64Data, 'base64'); // 解码图片
        console.log(req.url, 'req.url')
        console.log(req.url.split('/'), 'asdjas')
        let path = req.url.split('/')  
        path.length -= 1
        if (!path.includes('assets')) {
            path = ['assets'].concat(path.slice(1))
        } else {
            path = path.slice(1)
        }
        path = './' + path.join('/')
        console.log(path, 'path')

        fs.access(path, fs.constants.F_OK, function (err) {
            if(err) {
                console.log('目录不存在')
                // 不存在则创建目录
                fs.mkdir(path, {'recursive': true}, function (err) {
                    var dataBuffer = Buffer.from(data.data, 'base64'); // 这是另一种写法
                    console.log('./assets' + req.url, 'req.url')
                    fs.writeFile('./assets' + req.url, dataBuffer, function(err) {
                        console.log(123)
                        if(err){
                            console.log('gg')
                            res.send('gg');
                        }
                        res.redirect(`http://localhost:10000/assets${req.url}`);
                        // res.send()
                        next();
                    });
                })
            } else {
                var dataBuffer = Buffer.from(data.data, 'base64'); // 这是另一种写法
                console.log(req.url, 'req.url')
                fs.writeFile('.' + req.url, dataBuffer, function(err) {
                    console.log(1234455)
                    if(err){
                        console.log('gg')
                        res.send('gg');
                    }
                    res.redirect(`http://localhost:10000/assets${req.url}`);
                    next();
                });
            }
        })

        
    } else {
        res.send(data.data)
        next()
    }
})

// 开启服务器的监听
app.listen(10000, () => console.log('Example app listening on port 10000!'))

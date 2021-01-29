const axios = require('axios')
const Global = require('../plugins/global')

module.exports.$http = async (req, res) =>{
    console.log(req.originalUrl, 'req.originalUrl', Global)
    const params = {
        data: req.body,
        params: req.body,
        query: req.query,
        withCredentials: true,
        // 如果不设置这个的话，图片是受损的 json || default
        responseType: req.headers['sec-fetch-dest'] === 'image' ? 'arraybuffer' : ''
    }
    let postData = {
        method: req.method,
        url: Global.interfaceBaseUrl + req.originalUrl,
    }

    for (const key in params) {
        const item = params[key]
        if (item) {
            postData[key] = item
        }
    }

    console.log(postData, 'postData')
    const { data } = await axios(postData)
    return data;
}

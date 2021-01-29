const axios = require('axios')

module.exports.$http = async (req, res) =>{
    console.log(req.originalUrl, 'req.originalUrl')
    const params = {
        data: req.body,
        params: req.body,
        query: req.query,
        // 如果不设置这个的话，图片是受损的 json || default
        responseType: req.headers['sec-fetch-dest'] === 'image' ? 'arraybuffer' : ''
    }
    let postData = {
        method: req.method,
        url: `http://localhost:3001${req.originalUrl}`,
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

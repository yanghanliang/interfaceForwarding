const { $http } = require('./http')

module.exports.image = async (req, res) => {
    const data = await $http(req, res)
    var dataBuffer = Buffer.from(data, 'base64'); // 这是另一种写法
    res.send(dataBuffer)
}

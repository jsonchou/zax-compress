const tiny = require('./modules/tiny')
const base64 = require('./modules/base64')
const clean = require('./modules/clean')

class COMPRESS {

}

Object.assign(COMPRESS.prototype, {
    clean,
    tiny,
    base64
})

module.exports = new COMPRESS()
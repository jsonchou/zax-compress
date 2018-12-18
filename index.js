const tiny = require('./esm/tiny')
const base64 = require('./esm/base64')
const clean = require('./esm/clean')

class COMPRESS {

}

Object.assign(COMPRESS.prototype, {
    clean,
    tiny,
    base64
})

module.exports = new COMPRESS()
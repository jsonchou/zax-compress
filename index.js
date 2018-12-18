const tiny = require('./esm/tiny')
const base64 = require('./esm/base64')

class COMPRESS {
}

Object.assign(COMPRESS.prototype, {
    tiny,
    base64
})

module.exports = COMPRESS
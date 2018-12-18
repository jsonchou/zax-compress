let COMPRESS = require('../index')

let config = require('./cfg')

let compress = new COMPRESS({
    ...config
})

compress.init()
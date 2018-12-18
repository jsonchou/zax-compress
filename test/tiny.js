let zaxCompress = require('../index')

let config = require('./cfg')

let compress = new zaxCompress()

const getResult = async () => {
    let result = await compress.tiny(config).catch(err => {
        console.log(err)
    })
    return result
}
 
getResult()
let compress = require('../index')

let config = require('./cfg') 

const getResult = async () => {
    let result = await compress.base64(config).catch(err => {
        console.log(err)
    })
    return result
}
 
getResult()
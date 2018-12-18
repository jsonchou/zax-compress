let COMPRESS = require('../index')

let config = require('./cfg')

let compress = new COMPRESS({
    ...config
})

const getResult = async () => {
    let result = await compress.init().catch(err => {
        // console.log(err)
    })
    return result
}
 
// console.log(getResult())
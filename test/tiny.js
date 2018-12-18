
const path = require('path');
let compress = require('../index')

let config = require('./cfg') 

const getResult = async () => {
    let result = await compress.tiny(config).catch(err => {
        console.log(err)
    })
    return result
}
 
getResult()
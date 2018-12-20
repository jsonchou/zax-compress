
const path = require('path');
const doneRainbow=require('done-rainbow')
let compress = require('../index')
let config = require('./cfg') 

const getResult = async () => {
    let result = await compress.clean(config).catch(err => {
        console.log(err)
    })
    doneRainbow(`\u{1F60E} compress.clean done!`)         
    return result
}
 
getResult()
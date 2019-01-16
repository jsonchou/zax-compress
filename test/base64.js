
const path = require('path');
const doneRainbow=require('done-rainbow')
let compress = require('../index')
let config = require('./cfg') 
let utils = require('../utils/index')
let {
    emoji
} = utils;

const getResult = async () => {
    console.log('we suggest a webp fromat should be a better way to convert a base64 file')
    let result = await compress.base64(config).catch(err => {
        console.log(err)
    })
    doneRainbow(`${emoji.cool} compress.base64 done!`) 
    return result
}
 
getResult()
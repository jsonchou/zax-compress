const path = require('path');
const chalk = require('chalk');
const doneRainbow = require('done-rainbow')
let compress = require('../index')
let config = require('./cfg')
let utils = require('../utils/index')
let {
    emoji
} = utils;

const getResult = async () => {
    console.log(`${chalk.yellow(emoji.tip+' we suggest a webp format should be a better way to convert a base64 file')}`)
    console.log()
    let result = await compress.base64(config).catch(err => {
        console.log(err)
    })
    doneRainbow(`${emoji.cool} compress.base64 done!`)
    return result
}

getResult()
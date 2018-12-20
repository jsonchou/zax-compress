const path = require('path');
const doneRainbow = require('done-rainbow')
let compress = require('../index')
let config = require('./cfg')
let utils = require('../utils/index')
let {
    emoji
} = utils;

const getResult = async () => {
    let result = await compress.clean(config).catch(err => {
        console.log(err)
    })
    doneRainbow(`${emoji.cool} compress.clean done!`)
    return result
}

getResult()
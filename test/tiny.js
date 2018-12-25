const path = require('path');
const doneRainbow = require('done-rainbow')
let compress = require('../index')
let config = require('./cfg')
let utils = require('../utils/index')

let {
    emoji
} = utils;

const getResult = async () => {
    let result = await compress.tiny(config).catch(err => {
        console.log(err)
    })
    doneRainbow(`${emoji.cool} compress.tiny done!`, 0)
    return result
}

getResult()
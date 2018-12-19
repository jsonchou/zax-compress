const fs = require('fs-extra')
const path = require('path');
const doneRainbow = require('done-rainbow')

const utilName = `compress.clean`

module.exports = options => {
    return new Promise((resolve, reject) => {
        try {
            fs.removeSync(path.resolve(options.imageDist))
            resolve(options.imageDist)
        } catch (err) {
            reject(err)
        }
        doneRainbow(`\u{1F60E} ${utilName} done!`)
    });
}
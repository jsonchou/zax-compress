const fs = require('fs-extra')
const path = require('path');

let config = require('./cfg')

const doneRainbow = require('done-rainbow')

function clean() {
    fs.removeSync(path.resolve(config.imageDist))
    doneRainbow('\u{1F60E} done!')
}

clean();
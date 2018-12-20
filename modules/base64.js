const fs = require('fs-extra')
const path = require('path');
const doneRainbow = require('done-rainbow')
const klawSync = require('klaw-sync')
const asyncModule = require('async')

const utils = require('../utils/index')

const utilName = `compress.base64`

const config = {
    // project configuration
    enumFormat: ['.jpeg', '.jpg', '.png'],
    imageSrc: 'src',
    imageDist: 'dist',
}
module.exports = function (options) {
    options = Object.assign({}, config, options)

    let {
        imageSrc,
        imageDist
    } = options;

    const srcPath = path.resolve(imageSrc)
    const distPath = path.resolve(imageDist)

    // 创建缺失文件夹
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath)
    }

    if (!fs.existsSync(srcPath)) {
        fs.mkdirSync(srcPath)
    }

    if (klawSync(distPath).length) {
        console.error(`  \u{1F602} dist should be empty, you can run [clean] to delete dist dir, ${utilName} application will exit`)
        process.exit()
    }

    let srcFiles = klawSync(srcPath, {
        nodir: true
    })
    if (!srcFiles.length) {
        console.error(`  \u{1F602} src should not be empty, ${utilName} application will exit`)
        process.exit()
    } else {
        return new Promise((resolve, reject) => {

            asyncModule.mapSeries(srcFiles, async sub => {
                if (utils.inFormats(options, sub.path)) {
                    let basename = sub.path.split('/').pop()
                    let filename = basename.split('.')[0]
                    let filetype = basename.split('.')[1]
                    let lastChar = sub.path.lastIndexOf('/')
                    let outPut = sub.path.slice(0, lastChar) || '/'
                    outPut = outPut.replace(srcPath, distPath)
                    try {
                        // console.log(sub.path, '----', outPut)

                        let stream = fs.readFileSync(sub.path, {
                            encoding: 'base64'
                        })
                        stream = utils.base64Prefix(filetype, stream)
                        // console.log(stream)

                        let outPutPath = path.resolve(outPut, filename + '.js')
                        fs.outputFileSync(outPutPath, stream, {
                            encoding: 'utf8'
                        })

                        return outPutPath
                    } catch (er) {
                        console.error(er)
                        return err;
                    }
                } else {
                    console.log('not correct format:', sub.path)
                    return null
                }
            }, (err, results) => {
                if (err) {
                    reject(err)
                    throw err
                }
                results = results.filter(c => c != null)
                // doneRainbow(`\u{1F60E} ${utilName} done!`)
                resolve(results)
            })
        })
    }
}
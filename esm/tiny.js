const fs = require('fs-extra')
const path = require('path');
const execa = require('execa');
const mozjpeg = require('mozjpeg');
const doneRainbow = require('done-rainbow')
const klawSync = require('klaw-sync')
const asyncModule = require('async')

const utils= require('../utils/index')

const utilName = `compress.tiny`

const _inFormats = function (options, path) {
    return options.enumFormat.some(item => path.lastIndexOf(item) > -1)
}

const config = {
    // compress configuration
    progressive: true,
    quality: 75,

    // project configuration
    enumFormat: ['.jpeg', '.jpg', '.png'],
    imageSrc: 'src',
    imageDist: 'dist',
}

module.exports = function (options) {
    options = Object.assign({}, config, options)

    let {
        progressive,
        quality,


        imageSrc,
        imageDist
    } = options;

    const args = [];

    args.push('-quality', quality);
    if (!progressive) {
        args.push('-baseline');
    }

    // args.push('-notrellis');
    // args.push('-notrellis-dc');
    // args.push('-noovershoot');

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
        console.error(`  \u{1F602} dist is not empty, ${utilName} application will exit`)
        process.exit()
    }

    let srcFiles = klawSync(srcPath, {
        nodir: true
    })
    if (!srcFiles.length) {
        console.error(`  \u{1F602} dist is not empty, ${utilName} application will exit`)
        process.exit()
    } else {
        return new Promise((resolve, reject) => {

            asyncModule.mapSeries(srcFiles, async sub => {
                if (utils.inFormats(options, sub.path)) {
                    let basename = sub.path.split('/').pop()
                    let lastChar = sub.path.lastIndexOf('/')
                    let outPut = sub.path.slice(0, lastChar) || '/'
                    outPut = outPut.replace(srcPath, distPath)
                    try {
                        // console.log(sub.path, '----', outPut)
                        let stream = await execa.stdout(mozjpeg, args, {
                            encoding: null,
                            input: fs.readFileSync(sub.path),
                            maxBuffer: Infinity
                        });

                        let outPutPath = path.resolve(outPut, basename)
                        let result = fs.outputFileSync(outPutPath, stream)
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
                doneRainbow(`\u{1F60E} ${utilName} done!`)
                resolve(results)
            })
        })
    }
}
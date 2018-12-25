const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')
const execBuffer = require('exec-buffer');
const mozjpeg = require('mozjpeg')
const pngquant = require('pngquant-bin')
const gifsicle = require('gifsicle')
const doneRainbow = require('done-rainbow')
const klawSync = require('klaw-sync')
const asyncModule = require('async')

const utils = require('../utils/index')
let {
    emoji
} = utils;

const utilName = `compress.tiny`

const _inFormats = function (options, path) {
    return options.enumFormat.some(item => path.lastIndexOf(item) > -1)
}

const config = {
    // moz compress configuration
    quality: 75,

    // pngquant compress configuration

    // project configuration
    enumFormat: ['.jpeg', '.jpg', '.png'],
    imageSrc: 'src',
    imageDist: 'dist',

}

const mozArgs = (opts) => {
    const args = []
    args.push('-quality', opts.quality);
    return args
}

const quantArgs = (options) => {

    const args = ['-'];

    if (options.floyd && typeof options.floyd === 'number') {
        args.push(`--floyd=${options.floyd}`);
    }

    if (options.floyd && typeof options.floyd === 'boolean') {
        args.push('--floyd');
    }

    if (options.nofs) {
        args.push('--nofs');
    }

    if (options.posterize) {
        args.push('--posterize', options.posterize);
    }

    if (options.quality) {
        args.push('--quality', options.quality);
    }

    if (options.speed) {
        args.push('--speed', options.speed);
    }

    if (options.verbose) {
        args.push('--verbose');
    }

    if (options.strip) {
        args.push('--strip');
    }

    return args;
}

const gifArgs = (opts, outPutPath, path) => {
    const args = ['--no-warnings', '--no-app-extensions']

    if (opts.quality) {
        let quality = Math.round((opts.quality * 3) / 100)
        args.push(`--optimize=${quality}`)
    }

    // args.push('--output', outPutPath, path);
    args.push('--output', execBuffer.output, execBuffer.input);

    return args
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
        console.error(`  ${emoji.cry} dist should be empty, you can use compress:clean to delete dist dir, ${utilName} application will exit`)
        process.exit()
    }

    let srcFiles = klawSync(srcPath, {
        nodir: true
    })
    if (!srcFiles.length) {
        console.error(`  ${emoji.cry} src should not be empty, ${utilName} application will exit`)
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

                        let outPutPath = path.resolve(outPut, basename)
                        let stream = ''
                        let originStream = fs.readFileSync(sub.path)

                        if (['jpeg', 'jpg'].includes(filetype)) {
                            let args = mozArgs(options);
                            stream = await utils.wrapBin(mozjpeg, args, originStream)
                        } else if (['png'].includes(filetype)) {
                            let args = quantArgs(options)
                            stream = await utils.wrapBin(pngquant, args, originStream)
                        } else if (['gif'].includes(filetype)) {
                            let args = gifArgs(options, outPutPath, sub.path);

                            stream = await execBuffer({
                                input: originStream,
                                bin: gifsicle,
                                args
                            }).catch(error => {
                                error.message = error.stderr || error.message;
                                throw error;
                            });

                            // stream = await utils.wrapBin(gifsicle, args, originStream).catch(err => {
                            //     console.log(err)
                            // })
                        }

                        let result = fs.outputFileSync(outPutPath, stream)
                        return outPutPath
                    } catch (err) {
                        console.error(err)
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
                // doneRainbow(`${emoji.cool} ${utilName} done!`)
                resolve(results)
            })
        })
    }
}
const fs = require('fs-extra')
const path = require('path');
const execa = require('execa');
const mozjpeg = require('mozjpeg');
const doneRainbow = require('done-rainbow')
const klawSync = require('klaw-sync')
const asyncModule = require('async')

class COMPRESS {
    constructor(options) {
        this.options = Object.assign({}, {
            // compress configuration
            progressive: true,
            quality: 75,

            // project configuration
            enumFormat: ['.jpeg', '.jpg', '.png'],
            imageSrc: 'src',
            imageDist: 'dist',

        }, options)
    }
    _inFormats(path) {
        return this.options.enumFormat.some(item => path.lastIndexOf(item) > -1)
    }
    init() {
        let {
            progressive,
            quality,


            imageSrc,
            imageDist
        } = this.options;

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
            console.error('  \u{1F602}--dist is not empty, compress application will exit')
            process.exit()
        }

        let srcFiles = klawSync(srcPath)
        if (!srcFiles.length) {
            console.error('  \u{1F602}--dist is not empty, compress application will exit')
            process.exit()
        } else {
            asyncModule.mapSeries(srcFiles, async sub => {
                if (this._inFormats(sub.path)) {
                    let basename = sub.path.split('/').pop()
                    let lastChar = sub.path.lastIndexOf('/')
                    let outPut = sub.path.slice(0, lastChar) || '/'
                    outPut = outPut.replace(srcPath, distPath)
                    try {
                        console.log(sub.path, '----', outPut)
                        let stream = await execa.stdout(mozjpeg, args, {
                            encoding: null,
                            input: fs.readFileSync(sub.path),
                            maxBuffer: Infinity
                        });

                        let outPutPath = path.resolve(outPut, basename)
                        let result = fs.outputFileSync(outPutPath, stream)
                        return result
                    } catch (er) {
                        console.error(er)
                    }
                } else {
                    return null
                }
            }, (err, results) => {
                console.log(results)
                if (err) throw err
                doneRainbow('\u{1F60E} Compress done!')
            })


        }
    }
}

module.exports = COMPRESS
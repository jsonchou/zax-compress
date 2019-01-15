const path = require('path')
const execa = require('execa')

module.exports = {
    inFormats(options, path) {
        return options.enumFormat.some(item => path.lastIndexOf(item) > -1)
    },
    base64Prefix(format, stream) {
        // console.log(`let base64Stream="data:image/${format};base64,`)
        return `let base64Stream="data:image/${format};base64,${stream}"`
    },
    emoji: {
        cool: '\u{1F60E}',
        cry: '\u{1F602}',
        check: '\u{2714}',
        info: '\u{2716}',
    },
    async wrapBin(bin, args, originStream) {
        return new Promise((resolve, reject) => {
            try {
                let stream = execa.stdout(bin, args, {
                    encoding: null,
                    input: originStream,
                    maxBuffer: Infinity
                }).catch(err => {
                    console.log(err)
                })
                resolve(stream)
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
    }
}
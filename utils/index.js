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
    async wrapBin(bin, args, originStream) {
        return new Promise((resolve, reject) => {
            try {
                let stream = execa.stdout(bin, args, {
                    encoding: null,
                    input: originStream,
                    maxBuffer: Infinity
                })
                resolve(stream)
            } catch (err) {
                reject(err)
            }
        })
    }
}
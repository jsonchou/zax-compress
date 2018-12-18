const path = require('path')

module.exports = {
    inFormats(options, path) {
        return options.enumFormat.some(item => path.lastIndexOf(item) > -1)
    },
    base64Prefix(format, stream) {
        // console.log(`let base64Stream="data:image/${format};base64,`)
        return `let base64Stream="data:image/${format};base64,${stream}"`
    }
}
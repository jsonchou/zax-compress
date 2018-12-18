const path = require('path')

module.exports = {
    inFormats(options, path) {
        return options.enumFormat.some(item => path.lastIndexOf(item) > -1)
    },
    base64Prefix(format, stream) {
        console.log(`var base64Stream="data:image/${format};base64,`)
        return `var base64Stream="data:image/${format};base64,${stream}"`
    }
}
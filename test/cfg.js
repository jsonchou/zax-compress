const path = require('path');

module.exports = {
    quality: 75,
    enumFormat: ['.jpeg', '.jpg', '.png'],
    imageSrc: path.resolve(__dirname, 'src'),
    imageDist: path.resolve(__dirname, 'dist'),
}
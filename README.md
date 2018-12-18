# ZAX Compress images
## use mozjpeg to compress images 

## install

~~~ base
npm i zax-compress -D
~~~

## use

~~~ javascript 
const compress = require('zax-compress')
or
import compress from 'zax-compress'

# tiny
compress.tiny({
    quality: 75,
    enumFormat: ['.jpeg', '.jpg', '.png'],
    imageSrc: './src',
    imageDist: './dist',
})

# base64
compress.base64({
    enumFormat: ['.jpeg', '.jpg', '.png'],
    imageSrc: './src',
    imageDist: './dist',
})
~~~

## TODO

* print compress loss log
* list skip ignore images

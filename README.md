# ZAX Compress images
## compress & base64 images of [jpeg|jpg|gif|webp]

## install

~~~ base
npm i zax-compress -D
~~~

## use

~~~ javascript 
const compress = require('zax-compress')

# tiny
compress.tiny({
    quality: 75,
    convertToWebp:true,
    enumFormat: ['.jpeg', '.jpg', '.png'],
    imageSrc: path.resolve(__dirname, 'src'),
    imageDist: path.resolve(__dirname, 'dist'),
})

# base64
compress.base64({
    enumFormat: ['.jpeg', '.jpg', '.png'],
    imageSrc: path.resolve(__dirname, 'src'),
    imageDist: path.resolve(__dirname, 'dist'),
})

# clean
compress.base64({
    imageDist: path.resolve(__dirname, 'dist'),
})
~~~

## TODO

* print compress loss log
* ~~~list skip ignore images~~~
